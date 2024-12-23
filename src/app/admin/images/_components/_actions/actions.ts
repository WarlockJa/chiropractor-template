"use server";

import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import { actionClient } from "@/lib/safeAction";
import { flattenValidationErrors } from "next-safe-action";
import { db } from "@db/db-connection";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { UnauthorisedAccessError } from "@/lib/rateLimiting/errors";
import getSession from "@/lib/db/getSession";
import { r2 } from "@cf/bucket/r2";
import { images } from "@db/schemaImage";
import { writeLogEntry } from "@/lib/log/actions";
import { LOG_CODES } from "@/lib/log/codesTable";
import { defaultBlurhash } from "@/appConfig";
import { env } from "@/lib/env.mjs";
import { CWBlurhash } from "@cf/blurhash/blurhash";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { createImageSchema, deleteImageSchema } from "./schemas";

export const addImageAction = actionClient
  .schema(createImageSchema)
  .action(async ({ parsedInput: { height, width, aria, imageFile } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // checking user rights
    if (user?.role !== "admin") {
      throw new UnauthorisedAccessError();
    }

    // rate limiting action to 100 per hour
    await rateLimitByIp({
      key: `createImage${user.id}`,
      limit: 100,
      window: 60 * 60 * 1000,
    });

    const image = await createImage({ height, width, aria, imageFile });

    revalidateTag("imagesTag");

    return image;
  });

// create image
async function createImage({
  aria,
  height,
  imageFile,
  width,
}: z.infer<typeof createImageSchema>) {
  if (!imageFile) return;
  // generating cuid2 to be used as image unique prefix allows images with the same name to be saved separately
  const prefix = createId();

  // saving image to R2
  try {
    // writing file to R2
    await r2.put(`${prefix}-${imageFile.name}`, imageFile);
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

  // generating blurhash from the worker in production
  let blurhash: string = defaultBlurhash;
  try {
    const headers = new Headers();
    headers.append(env.BLURHASHWORKER_HEADER, env.BLURHASHWORKER_ACCESS_KEY);
    if (process.env.NODE_ENV === "production") {
      blurhash = await CWBlurhash.fetch(
        `${env.BLURHASHWORKER_URL}?img=${env.NEXT_PUBLIC_R2_URI}/${prefix}-${imageFile.name}`,
        { headers },
      ).then((response) => response.text());
    }
  } catch (error: any) {
    // in case of error writing a log entry about R2 operation fail
    await writeLogEntry({
      code: LOG_CODES.error.storage_operation_fail,
      source: "createImage",
      text: error.message,
      type: "error",
    });
    throw new Error(error.message);
  }

  // creating DB image record
  try {
    return (
      await db
        .insert(images)
        .values({
          name: `${prefix}-${imageFile.name}`,
          blurhash,
          width,
          height,
          sizeBytes: imageFile.size,
          aria,
        })
        .returning()
    )[0];
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
      r2.delete(`${prefix}-${imageFile.name}`),
    ]);
    throw new Error(error.message);
  }
}

// delete service
export const deleteImageAction = actionClient
  .schema(deleteImageSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { imageId } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // checking user rights
    if (user?.role !== "admin") {
      throw new UnauthorisedAccessError();
    }

    await rateLimitByIp({
      key: "services",
      limit: 30,
      window: 60000,
    });

    // removing service image from DB and R2
    const image = await deleteImage({ imageId });
    revalidateTag("imagesTag");
    revalidateTag(`imageNameTag${image.name}`);
    revalidateTag(`imageIdTag${image.imageId}`);

    return { status: "OK" };
  });

async function deleteImage({ imageId }: z.infer<typeof deleteImageSchema>) {
  // reading DB for image R2 URIs to delete
  try {
    const imageData = await db
      .delete(images)
      .where(eq(images.imageId, imageId))
      .returning();

    await r2.delete(imageData[0].name);

    return imageData[0];
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
}
