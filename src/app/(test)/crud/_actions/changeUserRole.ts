"use server";
import { writeLogEntry } from "@/lib/log/actions";
import { LOG_CODES } from "@/lib/log/codesTable";
import { db } from "@db/db-connection";
import { users } from "@db/schemaAuth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const changeUserRoleSchema = z.object({
  email: z.string().email(),
  role: z.string().nullable(),
});

export default async function changeUserRole({
  email,
  role,
}: {
  email: string;
  role: string | null;
}) {
  const result = changeUserRoleSchema.safeParse({ email, role });
  if (!result.success) return;

  const validEmail = result.data.email;
  const isAdmin =
    result.data.role && result.data.role === "admin" ? true : false;

  const dbSuccess = await db
    .update(users)
    .set({ role: isAdmin ? "admin" : null })
    .where(eq(users.email, validEmail))
    .returning();

  // console.log(dbSuccess);
  writeLogEntry({
    code: LOG_CODES.security.user_role_updated,
    source: "changeUserRole",
    type: "security",
    text: JSON.stringify(dbSuccess),
  });

  revalidatePath("/crud");
}
