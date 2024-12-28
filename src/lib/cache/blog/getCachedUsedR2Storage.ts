import { db } from "@db/db-connection";
import { images } from "@db/schemaImage";
import { sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedUsedR2Storage = cache(async () => {
  const getCachedData = unstable_cache(
    async () => {
      console.log(`Fetching used R2 storage`);
      return (
        await db
          .select({
            usedStorage: sql<number>`sum(${images.sizeBytes})`,
          })
          .from(images)
      )[0];
    },
    [`usedR2Storage`],
    { revalidate: 60 * 60 * 24 * 30, tags: [`usedR2StorageTag`] },
  );

  return await getCachedData();
});
