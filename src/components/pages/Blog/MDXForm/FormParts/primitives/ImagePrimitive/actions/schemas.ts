import { MAX_FILE_SIZE } from "@/appConfig";
import { SelectImages } from "@db/schemaImage";
import { z } from "zod";
import { zfd } from "zod-form-data";

const ACCEPTED_IMAGE_TYPES = ["image/"];

export const imageFileSchema = z.object({
  file: z.any().transform((file, ctx) => {
    if (file?.size === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "unsupported image type",
      });

      return z.NEVER;
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
  width: z.number().min(0),
  height: z.number().min(0),
});

export const createBlogImagesSchema = zfd.formData({
  imageFiles: zfd.repeatableOfType(imageFileSchema),
  blogId: z.number(),
});
// export const createImageSchema = zfd.formData({
//   imageFiles: zfd.repeatableOfType(
//     z.any().transform((file, ctx) => {
//       if (file?.size === 0) {
//         return undefined;
//       } else {
//         // testing for max size
//         if (file?.size > MAX_FILE_SIZE) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: `max image size is ${Math.floor(MAX_FILE_SIZE / 1000000)}MB`,
//           });

//           return z.NEVER;
//         }
//         // testing for image type
//         if (!ACCEPTED_IMAGE_TYPES.includes(file?.type.slice(0, 6))) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "unsupported image type",
//           });
//           return z.NEVER;
//         }

//         return file as File;
//       }
//     }),
//   ),
//   blog: z.string().cuid2(),
//   // aria: z.string().max(100).optional(),
//   // instagram: z.string().max(100).optional(),
// });

export const deleteImageSchema = z.custom<Pick<SelectImages, "imageId">>();
