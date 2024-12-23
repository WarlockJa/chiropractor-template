import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// images table
export const images = sqliteTable("image", {
  imageId: integer("imageId").primaryKey(),
  name: text("name").unique().notNull(),
  blurhash: text("blurhash").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  sizeBytes: integer("sizeB").notNull(),
  aria: text("aria").notNull(),
});

export type SelectImages = typeof images.$inferSelect;
