import { db } from "@db/db-connection";
import { blogs, blogs_images } from "@db/schemaBlog";
import { images } from "@db/schemaImage";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

// returns an array of images for the blog
export const getCachedBlogImages = cache(async (blogName: string) => {
  const getCachedData = unstable_cache(
    async (blogName: string) => {
      console.log(`Fetching blog post images ${blogName}`);
      return (
        await db
          .select({ image: images })
          .from(blogs_images)
          .innerJoin(blogs, eq(blogs.blogId, blogs_images.blogId))
          .innerJoin(images, eq(images.imageId, blogs_images.imageId))
          .where(eq(blogs.blogName, blogName))
      ).map((item) => item.image);
    },
    [`blogImages${blogName}`],
    { revalidate: 60 * 60 * 24, tags: [`blogImagesTag${blogName}`] },
  );

  return await getCachedData(blogName);
});
