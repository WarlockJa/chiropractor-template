import { db } from "@db/db-connection";
import { blogs } from "@db/schemaBlog";
import { sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

const LIMIT = 4;

export const getCachedBlogsCount = cache(async () => {
  const getCachedData = unstable_cache(
    async () => {
      console.log(`Fetching blogs count`);

      return (await db.select({ count: sql<number>`count()` }).from(blogs))[0]
        .count;
    },
    [`blogsCount`],
    { revalidate: 60 * 60 * 24, tags: [`blogsCountTag`] },
  );

  return await getCachedData();
});
