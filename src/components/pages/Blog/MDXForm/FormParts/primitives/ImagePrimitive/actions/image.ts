"use server";

import getSession from "@/lib/db/getSession";
import { writeLogEntry } from "@/lib/log/actions";
import { LOG_CODES } from "@/lib/log/codesTable";
import { r2 } from "@cf/bucket/r2";
import { db } from "@db/db-connection";
import { images, SelectImages } from "@db/schemaImage";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import {
  R2StorageLimitExceededError,
  UnauthorisedAccessError,
} from "@/lib/rateLimiting/errors";
import {
  createBlogImagesSchema,
  deleteImageSchema,
  imageFileSchema,
} from "./schemas";
import { defaultBlurhash, USER_STORAGE_LIMIT } from "@/appConfig";
import { getCachedUsedR2Storage } from "@/lib/cache/blog/getCachedUsedR2Storage";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import { blogs_images, SelectBlogImage, SelectBlogs } from "@db/schemaBlog";
import userCanEditBlog from "../../../../lib/userCanEditBlog";
import { getCachedImageBlog } from "@/lib/cache/blog/getCachedImageBlog";
import { q } from "@cf/queue/q";

export const createBlogImagesAction = actionClient
  .schema(createBlogImagesSchema)
  .action(async ({ parsedInput }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!userCanEditBlog({ user }) || !user) {
      // writing log entry
      await writeLogEntry({
        code: LOG_CODES.security.unauthorised_access,
        source: "createBlogImages",
        text: { user_session: session, blogId: parsedInput.blogId },
        type: "security",
      });
      throw new UnauthorisedAccessError();
    }

    // TODO rate limit before file data transfer?
    // rate limiting action to 100 per hour
    await rateLimitByIp({
      key: `createImage${user.id}`,
      limit: 100,
      window: 60 * 60 * 1000,
    });

    // reassembling parsed file and file dimensions array into a single array
    const parsedImages = parsedInput.imageFiles.map((file, index) => ({
      file: file,
      width: parsedInput.imageWidths[index],
      height: parsedInput.imageHeigths[index],
    }));

    // checking user storage limit
    const userUsedR2Storage = await getCachedUsedR2Storage();
    // console.log(userUsedR2Storage);

    const newFilesSize = parsedImages.reduce(
      (sum, item) => (item.file ? (sum += item.file.size) : sum),
      0,
    );

    // if user storage limit exceeded returning an error
    if (userUsedR2Storage.usedStorage + newFilesSize >= USER_STORAGE_LIMIT) {
      throw new R2StorageLimitExceededError();
    }

    const createImagePromises = parsedImages.map(
      (item) => item && createImage(item, { blogId: parsedInput.blogId }),
    );
    const result = await Promise.all(createImagePromises);

    // revalidating cached data
    revalidateTag(`usedR2StorageTag`);
    revalidateTag(`blogImagesTag${parsedInput.blogId}`);

    return result;
  });
async function createImage(
  { file, height, width }: z.infer<typeof imageFileSchema>,
  { blogId }: Pick<SelectBlogs, "blogId">,
): Promise<SelectImages> {
  // generating cuid2 to be used as image unique prefix allows images with the same name to be saved separately
  const prefix = createId();

  // saving image to R2
  try {
    // writing file to R2
    await r2.put(`${prefix}-${file.name}`, file);
  } catch (error: any) {
    // in case of error reading from DB attempting to write a log entry
    await writeLogEntry({
      code: LOG_CODES.error.storage_operation_fail,
      source: "createImage",
      text: error.message,
      type: "error",
    });

    throw new Error(error.message);
  }
  // creating DB image and blog_image records
  try {
    // creating image DB record and returning object to use the imageId
    const result = (
      await db
        .insert(images)
        .values({
          name: `${prefix}-${file.name}`,
          blurhash: defaultBlurhash,
          width,
          height,
          sizeBytes: file.size,
          aria: "default caption",
        })
        .returning()
    )[0];

    // generating blurhash and caption in production
    if (process.env.NODE_ENV === "production") {
      // queue accepts stringified objects (see QueueMessageBody type)
      const newImage: QueueMessageBody = {
        id: "New Image",
        body: JSON.stringify({
          imageId: result.imageId.toString(),
          name: result.name,
        }),
      };
      q.send(JSON.stringify(newImage));
    }

    // creating recrod for the blog_image table
    await db.insert(blogs_images).values({
      blogId,
      imageId: result.imageId,
    });

    return result;
  } catch (error: any) {
    // if error writing to R2 then deleting previously created DB record
    await Promise.all([
      // in case of error writing a log entry about R2 operation fail
      writeLogEntry({
        code: LOG_CODES.error.storage_operation_fail,
        source: "createImage",
        text: error.message,
        type: "error",
      }),
      db.delete(images).where(eq(images.name, `${prefix}-${file.name}`)),
      r2.delete(`${prefix}-${file.name}`),
    ]);
    throw new Error(error.message);
  }
}

export const deleteBlogImageAction = actionClient
  .schema(deleteImageSchema)
  .action(async ({ parsedInput: { imageId } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!userCanEditBlog({ user }) || !user) {
      // writing log entry
      await writeLogEntry({
        code: LOG_CODES.security.unauthorised_access,
        source: "deleteImage",
        text: { user_session: session, imageId: imageId },
        type: "security",
      });
      throw new UnauthorisedAccessError();
    }

    await deleteBlogImage({ imageId });
    revalidateTag(`userUsedR2StorageTag${user.id}`);
  });
async function deleteBlogImage({ imageId }: z.infer<typeof deleteImageSchema>) {
  // reading DB for image R2 URIs to delete
  let data: { image: SelectImages; blog_image: SelectBlogImage | null };
  try {
    data = await getCachedImageBlog(imageId);
  } catch (error: any) {
    // in case of error reading from DB attempting to write a log entry
    await writeLogEntry({
      code: LOG_CODES.error.database_operation_fail,
      source: "deleteImage",
      text: error.message,
      type: "error",
    });
    throw new Error(error.message);
  }

  // adding queue task to delete image from R2
  const deleteR2File: QueueMessageBody = {
    id: "R2 Delete",
    body: JSON.stringify([data.image.name]),
  };
  q.send(JSON.stringify(deleteR2File));

  // deleting DB record and revalidating images cache for the blog
  try {
    await db.delete(images).where(eq(images.imageId, imageId));
    // revalidating cached data
    revalidateTag("imagesTag");
    revalidateTag(`imageNameTag${data.image.name}`);
    revalidateTag(`imageIdTag${data.image.imageId}`);
    revalidateTag(`imageIdBlogTag${data.image.imageId}`);
    revalidateTag(`blogImagesTag${data.blog_image?.blogId}`);

    return { ok: true };
  } catch (error: any) {
    // in case of error deleting from DB attempting to write a log entry
    await writeLogEntry({
      code: LOG_CODES.error.database_operation_fail,
      source: "deleteImage",
      text: error.message,
      type: "error",
    });
    throw new Error(error.message);
  }
}
