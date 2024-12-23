"use server";
import { db } from "@db/db-connection";
import { users } from "@db/schemaAuth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteUserRoleSchema = z.object({
  email: z.string().email(),
});

export default async function deleteUser({ email }: { email: string }) {
  const result = deleteUserRoleSchema.safeParse({ email });
  if (!result.success) return;

  const validEmail = result.data.email;

  const dbSuccess = await db.delete(users).where(eq(users.email, validEmail));

  console.log(dbSuccess);

  revalidatePath("/crud");
}
