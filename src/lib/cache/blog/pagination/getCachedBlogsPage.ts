import { db } from "@db/db-connection";
import { blogs } from "@db/schemaBlog";
import { asc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getCachedBlog } from "../getCachedBlog";

// TODO add filetring by TAG and cache tag for TAG
export const getCachedBlogsPage = cache(async (page: number, limit: number) => {
  const getCachedData = unstable_cache(
    async (page: number, limit: number) => {
      try {
        console.log(`Fetching blogs page ${page}`);

        const blogsIds = await db
          .select({ blogId: blogs.blogId })
          .from(blogs)
          .orderBy(asc(blogs.updatedAt))
          .limit(limit)
          .offset(limit * (page ?? 0));

        return await Promise.all(
          blogsIds.map((id) => getCachedBlog(id.blogId)),
        );
      } catch (error) {
        return null;
      }
    },
    [`blogPostsPage${page}`],
    {
      revalidate: 60 * 60 * 24,
      tags: [`blogPostsPageTag${page}`, "blogPostsPages"],
    },
  );

  return await getCachedData(page, limit);
});
