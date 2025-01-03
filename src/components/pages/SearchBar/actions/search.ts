"use server";
import { actionClient } from "@/lib/safeAction";
import { searchSchema } from "./schemas";
import {
  CachedSearchResult,
  getCachedSearch,
} from "@/lib/cache/search/getCachedSearch";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import getSession from "@/lib/db/getSession";
import userCanEditBlog from "../../Blog/MDXForm/lib/userCanEditBlog";

// search action makes a request to the embeddings worker
export const searchAction = actionClient
  .schema(searchSchema)
  .action(async ({ parsedInput: { searchValue, resultsNumber } }) => {
    // getting user data
    const session = await getSession();
    const user = session?.user;

    await rateLimitByIp({
      key: "signUp",
      limit: 30,
      window: 5 * 60 * 1000,
    });

    // fetching blogs returned by Vectorize search
    const result = await getCachedSearch({
      value: searchValue,
      limit: resultsNumber,
    });

    // returning unfiltered search results if user have edit rights
    if (!result || userCanEditBlog({ user })) return result;

    // filtering unpublished blogs for user without edit rights
    // const publishedBlogs = result.blogs.filter((item) => item.blog.published);
    const publishedBlogs = result.blogsWithImages.filter(
      (item) => item.blog.blog.published,
    );

    // forming filtered result
    const searchResult: CachedSearchResult = {
      pages: result.pages,
      blogsWithImages: publishedBlogs,
    };

    return searchResult;
  });
