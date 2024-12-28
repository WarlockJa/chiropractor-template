import type { Config } from "drizzle-kit";

export default process.env.LOCAL_DB_PATH
  ? ({
      schema: [
        "./db/schemaAuth.ts",
        "./db/schemaLog.ts",
        "./db/schemaImage.ts",
        "./db/schemaBlog.ts",
      ],
      dialect: "sqlite",
      dbCredentials: {
        url: process.env.LOCAL_DB_PATH,
      },
    } as Config)
  : ({
      driver: "d1-http",
      dialect: "sqlite",
      schema: [
        "./db/schemaAuth.ts",
        "./db/schemaLog.ts",
        "./db/schemaImage.ts",
        "./db/schemaBlog.ts",
      ],
      out: "./drizzle",
    } satisfies Config);
