import { drizzle } from "drizzle-orm/d1";
import { getRequestContext } from "@cloudflare/next-on-pages";
import * as schemaAuth from "./schemaAuth";
import * as schemaLog from "./schemaLog";
import * as schemaImage from "./schemaImage";

export const db = drizzle(
  process.env.NODE_ENV === "development"
    ? getRequestContext().env.DB
    : (process.env as unknown as CloudflareEnv).DB,
  { schema: { ...schemaAuth, ...schemaLog, ...schemaImage } },
);
