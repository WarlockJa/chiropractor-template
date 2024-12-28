"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { r2 } from "@cf/bucket/r2";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z.any().transform((file, ctx) => {
  if (file?.size === 0) {
    return undefined;
  } else {
    // testing for max size
    if (file?.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "max image size is 5MB",
      });

      return z.NEVER;
    }
    // testing for image type
    if (!ACCEPTED_IMAGE_TYPES.includes(file?.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "unsupported image type",
      });
      return z.NEVER;
    }

    return file;
  }
});

const addFileSchema = z.object({
  file: fileSchema,
});

export async function uploadFile(prevState: unknown, formData: FormData) {
  const formEntries = Object.fromEntries(formData.entries());
  console.log(formEntries);

  const result = addFileSchema.safeParse(formEntries);
  console.log(result);
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  // validated File object
  const file = result.data.file;

  // converting File to a buffer
  const arrayBuffer = await file.arrayBuffer();

  // writing file
  const path = file.name;
  const test = await r2.put(path, arrayBuffer);
  console.log(test);

  //   const transformedImage = await fetch(
  //     `https://cloudflare-nextjs-r2.warlockja.com/cdn-cgi/image/width=80,quality=75/https://cloudflare-nextjs-r2.warlockja.com/${file.name}`
  //   );

  //   await r2.put(`transformed-${path}`, await transformedImage.blob());

  revalidatePath("/");
}

const deleteLocalR2ObjectSchema = z.object({
  key: z.string(),
});

export const deleteLocalR2Object = async (key: { key: string }) => {
  const data = deleteLocalR2ObjectSchema.safeParse(key);

  if (!data.success) return data.error;

  try {
    await r2.delete(data.data.key);

    revalidatePath("/upload");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
