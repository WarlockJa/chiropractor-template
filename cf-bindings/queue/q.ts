import { getRequestContext } from "@cloudflare/next-on-pages";

export const q =
  process.env.NODE_ENV === "development"
    ? getRequestContext().env.Q
    : (process.env as unknown as CloudflareEnv).Q;
