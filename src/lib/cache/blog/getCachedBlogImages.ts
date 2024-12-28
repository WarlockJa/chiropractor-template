import { db } from "@db/db-connection";
import { blogs_images } from "@db/schemaBlog";
import { images } from "@db/schemaImage";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

// returns an array of images for the blog
export const getCachedBlogImages = cache(async (blogId: number) => {
  const getCachedData = unstable_cache(
    async (blogId: number) => {
      console.log(`Fetching blog post images ${blogId}`);
      return (
        await db
          .select({ image: images })
          .from(blogs_images)
          .innerJoin(images, eq(images.imageId, blogs_images.imageId))
          .where(eq(blogs_images.blogId, blogId))
      ).map((item) => item.image);
    },
    [`blogImages${blogId}`],
    { revalidate: 60 * 60 * 24, tags: [`blogImagesTag${blogId}`] },
  );

  return await getCachedData(blogId);
});
