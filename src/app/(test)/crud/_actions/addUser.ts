"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addUserSchema = z.object({
  name: z.string().min(1).max(128),
  email: z.string().email(),
});

export default async function addUser(prevState: unknown, formData: FormData) {
  const result = addUserSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // const dbSuccess = await db.insert(users).values({
  //   ...data,
  // });

  // console.log(dbSuccess);

  revalidatePath("/crud");
}
