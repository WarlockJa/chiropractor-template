import HeaderImage from "@/components/HeaderImage";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { CustomButton } from "./CustomButton";

export default async function ContactsFooter() {
  const t = await getTranslations("Services");
  return (
    <HeaderImage
      dbImageName="g5k6fklxyixm4alm9syjr3dk-diagnostic.webp"
      className="relative h-96 w-screen"
    >
      <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-center text-primary-foreground">
        <h1 className="mb-8 text-center text-3xl uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)] md:text-5xl">
          {t("footer_title")}
        </h1>
        <Link href={"/contacts"}>
          <CustomButton
            text={t("footer_button_text")}
            variant={"secondary"}
            className="p-8 ring"
            textClassName="md:text-3xl"
          />
        </Link>
      </div>
    </HeaderImage>
  );
}
