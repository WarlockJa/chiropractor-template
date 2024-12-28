import { relations, sql } from "drizzle-orm";
import {
  AnySQLiteColumn,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { users } from "./schemaAuth";
import { images } from "./schemaImage";

// Blogs model
export const blogs = sqliteTable("blog", {
  blogId: integer("blogId").primaryKey(),
  owner: text("owner").references(() => users.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(STRFTIME('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(STRFTIME('%s', 'now'))`),
  // WARNING updated_at requires a TRIGGER to be placed into generated sql file
  // --> statement-breakpoint
  // CREATE TRIGGER [UPDATE_BLOG]
  //     AFTER UPDATE ON blog FOR EACH ROW
  //     WHEN OLD.updated_at = NEW.updated_at OR OLD.updated_at IS NULL
  // BEGIN
  //     UPDATE blog SET updated_at=(STRFTIME('%s', 'now')) WHERE id=NEW.id;
  // END;
  title: text("title").notNull(),
  description: text("description"),
  previewImage: integer("preview_image"),
  published: integer("published", { mode: "boolean" }).default(false),
  mdx: text("mdx").notNull(),
  // user interactions counters
  views: integer("views").notNull().default(0),
});

export const blogRelations = relations(blogs, ({ one }) => ({
  previewImage: one(images, {
    fields: [blogs.previewImage],
    references: [images.imageId],
  }),
}));

export type SelectBlogs = typeof blogs.$inferSelect;

// blogs_images model
export const blogs_images = sqliteTable(
  "blog_image",
  {
    blogId: integer("blogId")
      .notNull()
      .references(() => blogs.blogId, { onDelete: "cascade" }),
    imageId: integer("imageId")
      .notNull()
      .references(() => blogs.blogId, { onDelete: "cascade" }),
  },
  (blog_image) => ({
    pk_blog_image: primaryKey({
      columns: [blog_image.blogId, blog_image.imageId],
    }),
  }),
);

export type SelectBlogImage = typeof blogs_images.$inferSelect;

// Tags model
export const tags = sqliteTable("tag", {
  tagId: integer("tagId").primaryKey(),
  title: text("title").unique().notNull(),
});

// blog_tag model
export const blogs_tags = sqliteTable(
  "blog_tag",
  {
    blogId: integer("blogId")
      .notNull()
      .references(() => blogs.blogId, { onDelete: "cascade" }),
    tagId: integer("tagId")
      .notNull()
      .references(() => tags.tagId, { onDelete: "cascade" }),
  },
  (blog_tag) => ({
    pk_blog_tag: primaryKey({
      columns: [blog_tag.blogId, blog_tag.tagId],
    }),
  }),
);

// blogInteractions model
export const blogInteractions = sqliteTable(
  "blogInteractions",
  {
    blogId: integer("blogId")
      .notNull()
      .references(() => blogs.blogId, { onDelete: "cascade" }),
    userId: text("id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // status is an arbitrary integer code.
    // 0: no interaction
    // 1: like
    // 2: dislike
    // 3: favourite
    // 4: favourite and like
    // 5: favourite and dislike
    status: integer("status").default(0),
  },
  (blog_user) => ({
    pk_blog_user: primaryKey({
      columns: [blog_user.blogId, blog_user.userId],
    }),
  }),
);

// comments model
export const comments = sqliteTable("comment", {
  commentId: integer("commentId").primaryKey(),
  userId: text("id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  blogId: integer("blogId")
    .notNull()
    .references(() => blogs.blogId, { onDelete: "cascade" }),
  text: text("text").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(STRFTIME('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(STRFTIME('%s', 'now'))`),
  // WARNING updated_at requires a TRIGGER to be placed into generated sql file
  // --> statement-breakpoint
  // CREATE TRIGGER [UPDATE_COMMENT]
  //     AFTER UPDATE ON comment FOR EACH ROW
  //     WHEN OLD.updated_at = NEW.updated_at OR OLD.updated_at IS NULL
  // BEGIN
  //     UPDATE comment SET updated_at=(STRFTIME('%s', 'now')) WHERE id=NEW.id;
  // END;
  // self referencing foreign key
  repliesTo: integer("replyTo").references(
    (): AnySQLiteColumn => comments.commentId,
    { onDelete: "cascade" },
  ),
});

// commentInteractions model
export const commentInteractions = sqliteTable(
  "commentInteractions",
  {
    commentId: integer("commentId")
      .notNull()
      .references(() => blogs.blogId, { onDelete: "cascade" }),
    userId: text("id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // status is an arbitrary integer code.
    // 0: no interaction
    // 1: like
    // 2: dislike
    // 3: favourite (if applicable)
    // 4: favourite and like (if applicable)
    // 5: favourite and dislike (if applicable)
    status: integer("status").default(0),
  },
  (comment_user) => ({
    pk_comment_user: primaryKey({
      columns: [comment_user.commentId, comment_user.userId],
    }),
  }),
);
