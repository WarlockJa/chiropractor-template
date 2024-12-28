import { CustomButton } from "@/components/UniversalComponents/CustomButton";
import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const runtime = "edge";

export default async function BlogImageNotFound() {
  const t = await getTranslations("NotFound");
  // add image not found title
  const title = `404: ${t("title")}`;
  return (
    <HeaderImage
      dbImageName="hu7cdj94lbntqxmd7omb8w9x-bg-404.webp"
      containerClassName="h-screen w-screen"
      className="flex flex-col"
    >
      <title>{title}</title>
      <h1 className="text-xl">{t("title").toLocaleUpperCase()}</h1>
      <p className="text-9xl text-accent drop-shadow-[8px_8px_4px_rgba(0,0,0,0.8)] md:text-[20rem]">
        404
      </p>
      <Link href={"/"}>
        <CustomButton
          text={t("go_back")}
          className="border-2 border-accent bg-background/60 p-6 hover:bg-background/80"
          textClassName="md:text-2xl p-2"
        />
      </Link>
    </HeaderImage>
  );
}
