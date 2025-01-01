import { db } from "@db/db-connection";
import { blogs } from "@db/schemaBlog";
import { eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

const LIMIT = 4;

export const getCachedBlogsCount = cache(async (userCanEditBlog: boolean) => {
  const getCachedData = unstable_cache(
    async (userCanEditBlog: boolean) => {
      console.log(`Fetching blogs count`);

      return (
        userCanEditBlog
          ? await db.select({ count: sql<number>`count()` }).from(blogs)
          : await db
              .select({ count: sql<number>`count()` })
              .from(blogs)
              .where(eq(blogs.published, true))
      )[0].count;
    },
    [`blogsCount`],
    { revalidate: 60 * 60 * 24, tags: [`blogsCountTag`, "signInState"] },
  );

  return await getCachedData(userCanEditBlog);
});
