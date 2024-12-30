"use server";
import { actionClient } from "@/lib/safeAction";
import { searchSchema } from "./schemas";
import { getCachedSearch } from "@/lib/cache/search/getCachedSearch";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";

// search action makes a request to the embeddings worker
export const searchAction = actionClient
  .schema(searchSchema)
  .action(async ({ parsedInput: { searchValue, resultsNumber } }) => {
    await rateLimitByIp({
      key: "signUp",
      limit: 30,
      window: 5 * 60 * 1000,
    });

    const searchResult = await getCachedSearch({
      value: searchValue,
      limit: resultsNumber,
    });

    return searchResult;
  });
