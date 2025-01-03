import { unstable_cache } from "next/cache";
import { cache } from "react";
import { ai } from "@cf/ai/ai";
import { vectorize } from "@cf/vectorize/vectorize";
import { CachedBlog } from "../blog/blog";
import { getCachedBlogId } from "../blog/getCachedBlogId";
import { blogVectorizePrefix } from "@/components/pages/Blog/lib/prefixes";
import { getCachedImageBlog } from "../blog/getCachedImageBlog";
import { SelectImages } from "@db/schemaImage";

export interface BlogWithImage {
  blog: CachedBlog;
  image: SelectImages;
}

export interface CachedSearchResult {
  pages: VectorizeMatch[];
  blogsWithImages: BlogWithImage[];
}

export const getCachedSearch = cache(
  async ({
    value,
    limit = 1,
  }: {
    value: string;
    limit?: number;
  }): Promise<CachedSearchResult | undefined> => {
    const getCachedData = unstable_cache(
      async (
        value: string,
        limit: number,
      ): Promise<CachedSearchResult | undefined> => {
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

        // filtering pages vectors
        const pages = matches.matches
          .filter(
            (item) =>
              item.score > 0.55 &&
              item.id.slice(0, blogVectorizePrefix.length) !==
                blogVectorizePrefix,
          )
          .sort((a, b) => (a.score > b.score ? -1 : 1));

        try {
          // creating promises to find blogs returned by Vectorize query
          // filtering out results that are lower than 0.55 in likeliness on the cosine scale from 0 to 1
          // where 1 is the highest match value
          const blogPromises = matches.matches
            .filter(
              (item) =>
                item.score > 0.55 &&
                item.id.slice(0, blogVectorizePrefix.length) ===
                  blogVectorizePrefix,
            )
            .sort((a, b) => (a.score > b.score ? -1 : 1))
            .map((item) =>
              Promise.all([
                getCachedBlogId(
                  Number(item.id.slice(blogVectorizePrefix.length)),
                ),
                getCachedImageBlog(
                  Number(item.id.slice(blogVectorizePrefix.length)),
                ),
              ]),
            );

          // awaiting all promises
          const blogsWithImages: BlogWithImage[] = (
            await Promise.all(blogPromises)
          ).map((item) => ({ blog: item[0], image: item[1].image }));

          return { pages, blogsWithImages };
        } catch (error) {
          // TODO LOG error
          return undefined;
        }
      },
      [`searchQuery${value}${limit}`],
      {
        revalidate: 60 * 60 * 24,
        tags: [`searchQueryTag${value}${limit}`, "searchTag"],
      },
    );

    return await getCachedData(value, limit);
  },
);
