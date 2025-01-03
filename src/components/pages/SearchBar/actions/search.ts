"use server";
import { actionClient } from "@/lib/safeAction";
import { searchSchema } from "./schemas";
import { getCachedSearch } from "@/lib/cache/search/getCachedSearch";
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

    // filtering unpublished blogs
    // TODO in this form results are cutting away from the limit found by Vectorize
    // it would be better to maintain the limit of search results
    const searchResult =
      !result || !userCanEditBlog({ user })
        ? result
        : {
            ...result,
            blogs: result.blogs.filter((item) => item.blog.published),
          };

    return searchResult;
  });
