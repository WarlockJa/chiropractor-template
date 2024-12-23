import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const runtime = "edge";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const title = `404: ${t("title")}`;
  return (
    <section className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary text-primary-foreground">
      <title>{title}</title>
      <h1 className="text-xl">{t("title")}</h1>
      <p className="text-9xl md:text-[20rem]">404</p>
      <Button asChild size={"lg"}>
        <Link href={"/"}>{t("go_back")}</Link>
      </Button>
    </section>
  );
}
