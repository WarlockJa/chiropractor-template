import { UploadImage } from "./_components/UploadImage";
import ImagesList from "./_components/ImagesList";
import { redirect } from "next/navigation";
import getSession from "@/lib/db/getSession";
import { r2 } from "@cf/bucket/r2";

export default async function UploadPage() {
  // protecting page from unauthorised access
  // deduped auth
  const session = await getSession();
  const user = session?.user;

  if (user?.role !== "admin") redirect("/");

  const testList = await r2.list();

  const keysList = testList.objects.map((object) => object.key);

  return (
    <div className="mt-24 flex flex-col gap-2">
      <UploadImage />
      <ImagesList keysList={keysList} />
    </div>
  );
}

export const runtime = "edge";
