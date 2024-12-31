import { unstable_cache } from "next/cache";
import { cache } from "react";
import { ai } from "@cf/ai/ai";
import { vectorize } from "@cf/vectorize/vectorize";
import { CachedBlog, getCachedBlog } from "../blog/getCachedBlog";

export const getCachedSearch = cache(
  async ({
    value,
    limit = 1,
  }: {
    value: string;
    limit?: number;
  }): Promise<CachedBlog[] | undefined> => {
    const getCachedData = unstable_cache(
      async (
        value: string,
        limit: number,
      ): Promise<CachedBlog[] | undefined> => {
        console.log(`Fetching search for: ${value}`);

        // generating query vector
        const queryVector: EmbeddingResponse = await ai.run(
          "@cf/baai/bge-base-en-v1.5",
          {
            text: [value],
          },
        );

        const matches = await vectorize.query(queryVector.data[0], {
          topK: limit,
        });

        try {
          // creating promises to find blogs returned by Vectorize query
          // filtering out results that are lower than 0.55 in likeliness on the cosine scale from 0 to 1
          // where 1 is the highest match value

          const blogPromises = matches.matches
            .filter((item) => item.score > 0.55)
            // TODO implement sorting based on likeness and search item prefix (e.g. "blogId")
            .map((item) => getCachedBlog(Number(item.id.slice(6))));

          // awaiting all promises
          const result = await Promise.all(blogPromises);

          return result;
        } catch (error) {
          // TODO LOG error
          return undefined;
        }
      },
      [`searchQuery${value}${limit}`],
      { revalidate: 60 * 60 * 24, tags: [`searchQueryTag${value}${limit}`] },
    );

    return await getCachedData(value, limit);
  },
);
