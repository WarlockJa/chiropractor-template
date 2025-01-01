import { db } from "@db/db-connection";
import { blogs } from "@db/schemaBlog";
import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getCachedBlogId } from "../getCachedBlogId";

// TODO add filetring by TAG and cache tag for TAG
export const getCachedBlogsPage = cache(
  async (page: number, limit: number, userCanEditBlog: boolean) => {
    const getCachedData = unstable_cache(
      async (page: number, limit: number, userCanEditBlog: boolean) => {
        try {
          console.log(`Fetching blogs page ${page}`);

          const blogsIds = userCanEditBlog
            ? await db
                .select({ blogId: blogs.blogId, blogName: blogs.blogName })
                .from(blogs)
                .orderBy(asc(blogs.updatedAt))
                .limit(limit)
                .offset(limit * (page ?? 0))
            : await db
                .select({ blogId: blogs.blogId, blogName: blogs.blogName })
                .from(blogs)
                .where(eq(blogs.published, true))
                .orderBy(asc(blogs.updatedAt))
                .limit(limit)
                .offset(limit * (page ?? 0));

          return await Promise.all(
            blogsIds.map((id) => getCachedBlogId(id.blogId)),
          );
        } catch (error) {
          console.log(error);
          return null;
        }
      },
      [`blogPostsPage${page}`],
      {
        revalidate: 60 * 60 * 24,
        tags: [`blogPostsPageTag${page}`, "blogPostsPages", "signInState"],
      },
    );

    return await getCachedData(page, limit, userCanEditBlog);
  },
);
