import { MAX_FILE_SIZE } from "@/appConfig";
import { z } from "zod";
import { zfd } from "zod-form-data";

const ACCEPTED_IMAGE_TYPES = ["image/"];

export const createImageSchema = zfd.formData({
  imageFile: zfd.file(
    z.any().transform((file, ctx) => {
      if (file?.size === 0) {
        return undefined;
      } else {
        // testing for max size
        if (file?.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `max image size is ${Math.floor(MAX_FILE_SIZE / 1000000)}MB`,
          });

          return z.NEVER;
        }
        // testing for image type
        if (!ACCEPTED_IMAGE_TYPES.includes(file?.type.slice(0, 6))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "unsupported image type",
          });
          return z.NEVER;
        }

        return file as File;
      }
    }),
  ),
  aria: z.string().max(100),
  width: z.coerce.number().min(1),
  height: z.coerce.number().min(1),
});

export const deleteImageSchema = z.object({
  imageId: z.number(),
});
