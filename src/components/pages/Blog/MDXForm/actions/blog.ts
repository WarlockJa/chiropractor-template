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
import { q } from "@cf/queue/q";
import slugify from "react-slugify";
import { blogVectorizePrefix } from "../../lib/prefixes";
import { createId } from "@paralleldrive/cuid2";
import { r2 } from "@cf/bucket/r2";

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
  // preparing loop data
  // blogName is a slugified title
  const blogName = title && title.length > 3 ? slugify(title) : createId();
  // counter limits amount of attempts to create a unique name
  let counter: number | undefined;
  // blogNameWithSuffix is combined name with a counter suffix
  let blogNameWithSuffix = blogName;
  // preserving error in case it is not caused by D1 unique constraint failure
  let errorData: any;
  do {
    try {
      const result = await db
        .insert(blogs)
        .values({
          blogName: blogNameWithSuffix,
          title,
          description,
          previewImage,
          owner,
          mdx,
        })
        .returning();

      revalidateTag("blogPostsPages");

      return result;
    } catch (error: any) {
      errorData = error;
      // initiating/increasing counter
      counter ? (counter += 1) : (counter = 1);
      // generating name with a new suffix, or creating CUID on the last attempt
      blogNameWithSuffix =
        counter < 19 ? blogName.concat("-", counter.toString()) : createId();
    }
    // limiting number of loops to 20
  } while (counter < 20);

  // throwing an error if update has failed
  await writeLogEntry({
    code: LOG_CODES.error.database_operation_fail,
    source: "createBlog",
    text: errorData.message,
    type: "error",
  });

  throw new Error(errorData.message);
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

    // in production adding data to Vectorize
    if (process.env.NODE_ENV === "production") {
      // adding stripped blog data to Vectorize upsert body
      const upsertBody: VectorizeUpsertQueueItem = {
        id: `${blogVectorizePrefix}${result[0].blogId}`,
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

  // preparing loop data
  // blogName is a slugified title
  const blogName =
    data.title && data.title.length > 3 ? slugify(data.title) : createId();
  // counter limits amount of attempts to create a unique name
  let counter: number | undefined;
  // blogNameWithSuffix is combined name with a counter suffix
  let blogNameWithSuffix = blogName;
  // preserving error in case it is not caused by D1 unique constraint failure
  let errorData: any;
  do {
    try {
      const result = await db
        .update(blogs)
        .set({ ...newData, blogName: blogNameWithSuffix })
        .where(eq(blogs.blogId, data.blogId))
        .returning();

      revalidateTag(`blogPostTag${result[0].blogId}`);
      revalidateTag("blogPostsPages");
      revalidateTag(`blogPostTag${result[0].blogName}`);

      return result;
    } catch (error: any) {
      errorData = error;
      // initiating/increasing counter
      counter ? (counter += 1) : (counter = 1);
      // generating name with a new suffix, or creating CUID on the last attempt
      blogNameWithSuffix =
        counter < 19 ? blogName.concat("-", counter.toString()) : createId();
    }
    // limiting number of loops to 20
  } while (counter < 20);

  // throwing an error if update has failed
  await writeLogEntry({
    code: LOG_CODES.error.database_operation_fail,
    source: "updateBlog",
    text: errorData.message,
    type: "error",
  });

  throw new Error(errorData.message);
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
      blogName: blogs.blogName,
    })
    .from(blogs_images)
    .innerJoin(images, eq(images.imageId, blogs_images.imageId))
    .innerJoin(blogs, eq(blogs.blogId, blogId))
    .where(eq(blogs_images.blogId, blogId));

  // forming delete promises
  const deleteImagesPromise = db.delete(images).where(
    inArray(
      images.imageId,
      blogImages.map((item) => item.imageId),
    ),
  );
  const deleteBlogPromise = db.delete(blogs).where(eq(blogs.blogId, blogId));

  // executing delete promises
  await Promise.all([deleteImagesPromise, deleteBlogPromise]);

  // in production deleting data from R2 and Vectorize via queue
  if (process.env.NODE_ENV === "production") {
    // adding queue task to delete images from R2
    const deleteR2File: QueueMessageBody = {
      id: "R2 Delete",
      body: JSON.stringify(blogImages.map((item) => item.name)),
    };
    q.send(JSON.stringify(deleteR2File));

    // adding queue task to delete vectorize vector for the deleted blog
    // queue accepts stringified objects (see QueueMessageBody type)
    const addVectorizeBlogData: QueueMessageBody = {
      id: "Vectorize Delete",
      body: `${blogVectorizePrefix}${blogId}`,
    };
    q.send(JSON.stringify(addVectorizeBlogData));
  } else {
    // deleting blog images from the bucket in development
    const r2DeletePromises = blogImages.map((img) => r2.delete(img.name));
    await Promise.all(r2DeletePromises);
  }

  // revalidate cache
  blogImages.forEach((item) => {
    revalidateTag(`imageIdBlogTag${item.imageId}`);
  });
  revalidateTag("blogsCountTag");
  revalidateTag("blogPostsPages");
  revalidateTag("usedR2StorageTag");
  revalidateTag("imagesTag"); // needs to be deleted TODO
  revalidateTag(`blogPostTag${blogId}`);
  revalidateTag(`blogPostTag${blogImages[0].blogName}`);
  revalidateTag(`blogImagesTag${blogId}`);
}
