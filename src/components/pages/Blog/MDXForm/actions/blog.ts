"use server";

import getSession from "@/lib/db/getSession";
import { writeLogEntry } from "@/lib/log/actions";
import { LOG_CODES } from "@/lib/log/codesTable";
import { UnauthorisedAccessError } from "@/lib/rateLimiting/errors";
import { actionClient } from "@/lib/safeAction";
import { db } from "@db/db-connection";
import { blogs, blogs_images } from "@db/schemaBlog";
import { eq, inArray } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";
import {
  createBlogActionSchema,
  createBlogSchema,
  deleteBlogSchema,
  updateBlogSchema,
} from "./schemas";
import convertMDXtoVectorizableString from "../lib/convertMDXtoVectorizableString";
import userCanEditBlog from "../lib/userCanEditBlog";
import { images } from "@db/schemaImage";
import { r2 } from "@cf/bucket/r2";
import { q } from "@cf/queue/q";

// Create Blog
export const createBlogAction = actionClient
  .schema(createBlogActionSchema)
  .action(async ({ parsedInput }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !user.id || !userCanEditBlog({ user })) {
      // writing log entry
      writeLogEntry({
        code: LOG_CODES.security.unauthorised_access,
        source: "createBlog",
        text: {
          user_session: session,
          data: parsedInput,
        },
        type: "security",
      });
      throw new UnauthorisedAccessError();
    }
    const blogId = await createBlog({ ...parsedInput, owner: user.id });

    // in production adding blog data to Vectorize
    if (process.env.NODE_ENV === "production") {
      // adding stripped blog data to Vectorize upsert body
      const upsertBody: VectorizeUpsertQueueItem = {
        id: `blogId${blogId}`,
        value: convertMDXtoVectorizableString({
          mdx: JSON.parse(parsedInput.mdx),
        }),
      };
      // queue accepts stringified objects (see QueueMessageBody type)
      const addVectorizeBlogData: QueueMessageBody = {
        id: "Vectorize Upsert",
        body: JSON.stringify(upsertBody),
      };
      q.send(JSON.stringify(addVectorizeBlogData));
    }

    // invalidating cache tags
    revalidateTag("blogsCountTag");
    revalidateTag("blogPostsPages");

    return blogId;
  });

async function createBlog({
  description,
  mdx,
  previewImage,
  owner,
  title,
}: z.infer<typeof createBlogSchema>) {
  try {
    const response = await db
      .insert(blogs)
      .values({
        title,
        description,
        previewImage,
        owner,
        mdx,
      })
      .returning();

    return response[0].blogId;
  } catch (error: any) {
    // if error is caused by nextjs redirect then redirect
    if (isRedirectError(error)) throw error;
    // in case of error reading from DB attempting to write a log entry
    await writeLogEntry({
      code: LOG_CODES.error.database_operation_fail,
      source: "createBlog",
      text: error.message,
      type: "error",
    });

    throw new Error(error.message);
  }
}

// update Blog
export const updateBlogAction = actionClient
  .schema(updateBlogSchema)
  .action(async ({ parsedInput }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userCanEditBlog({ user })) {
      // writing log entry
      writeLogEntry({
        code: LOG_CODES.security.unauthorised_access,
        source: "updateBlog",
        text: { user_session: session, data: parsedInput },
        type: "security",
      });
      throw new UnauthorisedAccessError();
    }

    const result = await updateBlog(parsedInput);
    console.log(result);

    // in production adding data to Vectorize
    if (process.env.NODE_ENV === "production") {
      // adding stripped blog data to Vectorize upsert body
      const upsertBody: VectorizeUpsertQueueItem = {
        id: `blogId${result[0].blogId}`,
        value: convertMDXtoVectorizableString({
          mdx: JSON.parse(result[0].mdx),
        }),
      };
      // queue accepts stringified objects (see QueueMessageBody type)
      const addVectorizeBlogData: QueueMessageBody = {
        id: "Vectorize Upsert",
        body: JSON.stringify(upsertBody),
      };
      q.send(JSON.stringify(addVectorizeBlogData));
    }

    return result;
  });
async function updateBlog(data: z.infer<typeof updateBlogSchema>) {
  // destructuring data to select only updatable properties
  const { blogId, ...newData } = data;

  try {
    const result = await db
      .update(blogs)
      .set(newData)
      .where(eq(blogs.blogId, data.blogId))
      .returning();

    revalidateTag(`blogPostTag${data.blogId}`);

    return result;
  } catch (error: any) {
    // if error is caused by nextjs redirect then redirect
    if (isRedirectError(error)) throw error;
    // in case of error reading from DB attempting to write a log entry
    await writeLogEntry({
      code: LOG_CODES.error.database_operation_fail,
      source: "updateBlog",
      text: error.message,
      type: "error",
    });

    throw new Error(error.message);
  }
}

// Delete Blog and associated images
export const deleteBlogAction = actionClient
  .schema(deleteBlogSchema)
  .action(async ({ parsedInput: { blogId } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userCanEditBlog({ user })) {
      // writing log entry
      await writeLogEntry({
        code: LOG_CODES.security.unauthorised_access,
        source: "deleteBlog",
        text: { user_session: session, blogId: blogId },
        type: "security",
      });
      throw new UnauthorisedAccessError();
    }

    await deleteBlog({ blogId });
  });
async function deleteBlog({ blogId }: z.infer<typeof deleteBlogSchema>) {
  // reading blog_images with file names
  const blogImages = await db
    .select({
      imageId: images.imageId,
      name: images.name,
    })
    .from(blogs_images)
    .innerJoin(images, eq(images.imageId, blogs_images.imageId))
    .where(eq(blogs_images.blogId, blogId));

  // forming delete promises
  const deleteR2Promises = blogImages.map((item) => r2.delete(item.name));
  const deleteImagesPromise = db.delete(images).where(
    inArray(
      images.imageId,
      blogImages.map((item) => item.imageId),
    ),
  );
  const deleteBlogPromise = db.delete(blogs).where(eq(blogs.blogId, blogId));

  // executing delete promises
  await Promise.all([deleteR2Promises, deleteImagesPromise, deleteBlogPromise]);

  // revalidate cache
  blogImages.forEach((item) => {
    revalidateTag(`imageIdBlogTag${item.imageId}`);
  });
  revalidateTag("blogsCountTag");
  revalidateTag("blogPostsPages");
  revalidateTag("usedR2StorageTag");
  revalidateTag("imagesTag"); // needs to be deleted TODO
  revalidateTag(`blogPostTag${blogId}`);
  revalidateTag(`blogImagesTag${blogId}`);
}
