import { db } from "@db/db-connection";
import { blogs_images } from "@db/schemaBlog";
import { images } from "@db/schemaImage";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

// returns image data with an associated blogId
export const getCachedImageBlog = cache(async (dbImageId: number) => {
  const getCachedData = unstable_cache(
    async (dbImageId: number) => {
      console.log(`Fetching blog image with ID ${dbImageId}`);

      const result = (
        await db
          .select()
          .from(images)
          .leftJoin(blogs_images, eq(blogs_images.imageId, dbImageId))
          .where(eq(images.imageId, dbImageId))
      )[0];

      return result;
    },
    [`imageIdBlog${dbImageId}`],
    { revalidate: 60 * 60 * 24 * 30, tags: [`imageIdBlogTag${dbImageId}`] }, // 30 days.
  );

  return await getCachedData(dbImageId);
});
