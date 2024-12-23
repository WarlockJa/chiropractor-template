import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const logs = sqliteTable("log", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(STRFTIME('%s', 'now'))`),
  source: text("source", { length: 254 }),
  text: text("description", { length: 2048 }),
  type: text("type", { length: 254 }),
  code: integer("code", { mode: "number" }),
});

export type SelectLogs = typeof logs.$inferSelect;
