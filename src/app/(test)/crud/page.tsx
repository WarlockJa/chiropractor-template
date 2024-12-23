import UserTable from "./_components/UserTable";
import AddUserForm from "./_components/AddUserForm";
import { redirect } from "next/navigation";
import getSession from "@/lib/db/getSession";

export const runtime = "edge";

export default async function CRUDPage() {
  // protecting page from unauthorised access
  // deduped auth
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/");
  // if (!user) redirect("/api/auth/signin?callbackUrl=/crud");

  return (
    <>
      <UserTable />
      {user.role === "admin" && <AddUserForm />}
    </>
  );
}
