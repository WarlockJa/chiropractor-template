import { getRequestContext } from "@cloudflare/next-on-pages";

export const CWImageCaption =
  process.env.NODE_ENV === "development"
    ? getRequestContext().env.CWImageCaption
    : (process.env as unknown as CloudflareEnv).CWImageCaption;
