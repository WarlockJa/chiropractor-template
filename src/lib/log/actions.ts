"use server";

import { db } from "@db/db-connection";
import { logs } from "@db/schemaLog";
import { z } from "zod";

const writeLogEntrySchema = z.object({
  text: z.any(),
  source: z.string(),
  type: z.custom<TLogEntry>(),
  code: z.number(),
});

export async function writeLogEntry({
  text,
  code,
  source,
  type,
}: z.infer<typeof writeLogEntrySchema>) {
  const validData = writeLogEntrySchema.safeParse({ text, code, source, type });

  if (validData.success === false) {
    console.log(validData.error);
    return validData.error;
  }

  try {
    // forming log entry with text any converted to string
    const logEntry = {
      ...validData.data,
      text: JSON.stringify(validData.data.text),
    };
    // writing logEntry to DB
    await db.insert(logs).values(logEntry);
  } catch (error: any) {
    console.log(error.message);
  }
}
