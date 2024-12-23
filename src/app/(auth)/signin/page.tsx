import { isRedirectError } from "next/dist/client/components/redirect";
import SignInClientComponent from "./_components/SignInClientComponent";
import getSession from "@/lib/db/getSession";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    // getting user data
    const session = await getSession();
    const user = session?.user;

    if (user) redirect("/");

    // reading url params for pagination
    return (
      <section className="mx-auto flex flex-col items-center justify-between overflow-hidden lg:max-w-screen-lg">
        <SignInClientComponent callbackUrl={searchParams.callbackUrl} />
      </section>
    );
  } catch (error: any) {
    // if error is caused by nextjs redirect then redirect
    if (isRedirectError(error)) throw error;
    // display error page
    console.log(error.message);
    throw new Error(error.message);
  }
}
