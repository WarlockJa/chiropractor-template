import { db } from "@db/db-connection";
import { images } from "@db/schemaImage";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedImages = cache(async () => {
  const getCachedData = unstable_cache(
    async () => {
      console.log(`Fetching db images`);

      const result = await db.select().from(images);

      return result;
    },
    [`images`],
    { revalidate: 60 * 60 * 24 * 30, tags: ["imagesTag"] }, // 30 days.
  );

  return await getCachedData();
});
