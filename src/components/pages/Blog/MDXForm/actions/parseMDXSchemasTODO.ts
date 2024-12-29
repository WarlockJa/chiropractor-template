/*
Custom MDX components passed values as strings which need to be parsed
This file contains schemas for validating parsed strings as valid data
*/
import { z } from "zod";

// TODO apply at updating blog to text mdx string before wirting it to the DB

// generic imageId schema
const imageIdSchema = z.coerce
  .number()
  .min(1)
  .int()
  .nullable()
  .optional()
  .default(null);

// hero part mdx schema
export const heroMDXSchema = z.object({
  imageId: imageIdSchema,
  title: z.string().optional().default(""),
  description: z.string().optional().default(""),
});

// image part mdx schema
export const imageMDXSchema = imageIdSchema;

// carousel part mdx schema
export const carouselMDXSchema = z.object({
  imageIds: z.array(imageIdSchema).default([null]),
  loop: z.coerce.boolean().default(false),
  fade: z.coerce.boolean().default(false),
  autoScroll: z.coerce.boolean().default(false),
  autoScrollSpeed: z.coerce.number().min(1).int().default(4),
});
