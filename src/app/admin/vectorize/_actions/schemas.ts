import { z } from "zod";

export const addToVectorizeSchema = z.object({
  text: z.string(),
  id: z.string(),
});

export const deleteFromVectorizeSchema = z.object({
  id: z.string(),
});
