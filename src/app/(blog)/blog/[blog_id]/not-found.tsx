import { Button } from "@/components/ui/button";
import { Link } from "react-transition-progress/next";

export const runtime = "edge";

export default async function CatalogNotFound({
  params,
}: {
  params: { catalog_id: string; user: string };
}) {
  return (
    <section className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary text-primary-foreground">
      <title>404: Catalog not found</title>
      <h1 className="text-xl">This page does not exist</h1>
      <p className="text-9xl md:text-[20rem]">404</p>
      {params?.user && (
        <Button asChild size={"lg"}>
          <Link href={`/${params.user}`}>Go to {params.user}&apos;s page</Link>
        </Button>
      )}
    </section>
  );
}
