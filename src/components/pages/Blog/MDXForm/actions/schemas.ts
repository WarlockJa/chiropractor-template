import { SelectBlogs } from "@db/schemaBlog";
import { z } from "zod";

// TODO change schemas with the fields validation
// picking fields from DB model required to create a new blog entry
export const createBlogActionSchema =
  z.custom<
    Omit<
      SelectBlogs,
      "blogId" | "createdAt" | "updatedAt" | "published" | "owner" | "views"
    >
  >();
export const createBlogSchema =
  z.custom<
    Omit<
      SelectBlogs,
      "blogId" | "createdAt" | "updatedAt" | "published" | "views"
    >
  >();

// picking fields possible to update from DB model and making them optional
// because not all of them are required for update
// combining with a required blog id field to for a resulting schema
export const updateBlogSchema = z.custom<
  Partial<Omit<SelectBlogs, "createdAt" | "updatedAt" | "blogId">> &
    Pick<SelectBlogs, "blogId">
>();

export const deleteBlogSchema = z.custom<Pick<SelectBlogs, "blogId">>();
