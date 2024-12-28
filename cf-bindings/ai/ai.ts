import { getRequestContext } from "@cloudflare/next-on-pages";

export const vectorize =
  process.env.NODE_ENV === "development"
    ? getRequestContext().env.VECTORIZE
    : (process.env as unknown as CloudflareEnv).VECTORIZE;
