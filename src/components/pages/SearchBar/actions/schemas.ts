import { z } from "zod";

export const getFeedPageActionSchema = z.object({
  page: z.number().min(0).max(20).optional().default(0),
  limit: z.number().min(1).max(40).optional().default(40),
});

export const searchSchema = z.object({
  searchValue: z
    .string()
    .min(3, { message: "Search requires at least 3 characters" })
    .max(100, { message: "String is too long!" }),
  resultsNumber: z.number().positive().max(20).default(20),
});
