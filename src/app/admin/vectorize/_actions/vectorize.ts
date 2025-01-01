"use server";

import { actionClient } from "@/lib/safeAction";
import { addToVectorizeSchema, deleteFromVectorizeSchema } from "./schemas";
import { flattenValidationErrors } from "next-safe-action";
import getSession from "@/lib/db/getSession";
import { UnauthorisedAccessError } from "@/lib/rateLimiting/errors";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import { z } from "zod";
import { ai } from "@cf/ai/ai";
import { vectorize } from "@cf/vectorize/vectorize";
import { revalidateTag } from "next/cache";

export const addToVectorizeAction = actionClient
  .schema(addToVectorizeSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id, text } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // checking user rights
    if (user?.role !== "admin") {
      throw new UnauthorisedAccessError();
    }

    await rateLimitByIp({
      key: "services",
      limit: 30,
      window: 60000,
    });

    // adding vector to Vectorize
    const result = await addToVectorize({ id, text });

    return result;
  });

async function addToVectorize({
  id,
  text,
}: z.infer<typeof addToVectorizeSchema>) {
  let vectorizeRetries = 3;
  while (vectorizeRetries > 0) {
    try {
      // creating vector representation of the passed upsert value
      const embeddingResponse = await ai.run("@cf/baai/bge-base-en-v1.5", {
        text,
      });

      // reassembling vectors with id values
      const vector: VectorizeVector = {
        id,
        values: embeddingResponse.data[0],
      };

      // adding vectors to Vectorize
      const result = await vectorize.upsert([vector]);
      console.log("VECTORIZE_UPSERT: ", result);
      vectorizeRetries = 0;

      return result;
    } catch (error) {
      // waiting 3 seconds before another try
      await new Promise((resolve) => setTimeout(resolve, 3000));
      vectorizeRetries--;
    }
  }
}

// delete from vectorize using id of the stored vector
export const deleteFromVectorizeAction = actionClient
  .schema(deleteFromVectorizeSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // checking user rights
    if (user?.role !== "admin") {
      throw new UnauthorisedAccessError();
    }

    await rateLimitByIp({
      key: "services",
      limit: 30,
      window: 60000,
    });

    // removing vector from Vectorize
    const result = await deleteFromVectorize({ id });

    revalidateTag("searchTag");

    return result;
  });

async function deleteFromVectorize({
  id,
}: z.infer<typeof deleteFromVectorizeSchema>) {
  let vectorizeRetries = 3;
  while (vectorizeRetries > 0) {
    try {
      // deleting vectors from Vectorize
      const result = await vectorize.deleteByIds([id]);
      console.log("VECTORIZE_DELETE: ", result);
      vectorizeRetries = 0;

      return result;
    } catch (error) {
      // waiting 3 seconds before another try
      await new Promise((resolve) => setTimeout(resolve, 3000));
      vectorizeRetries--;
    }
  }
}
