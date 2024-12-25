import { CustomButton } from "@/components/UniversalComponents/CustomButton";
import CustomHeader from "@/components/UniversalComponents/CustomHeader";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomeAboutUsRightPanel() {
  const t = useTranslations("AboutUsShort");
  return (
    <div className="bg-primary">
      <div className="mr-auto flex h-full max-w-screen-sm flex-col justify-center gap-4 px-6 py-8 text-primary-foreground lg:px-24">
        <h2>
          <CustomHeader
            text={t("words_about_us").toLocaleUpperCase()}
            fontSizeRem={2}
          />
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-4">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem nam quas, similique itaque ad quibusdam cumque quasi
            dolores aliquid porro, nesciunt quo non ab excepturi, nulla saepe
            eveniet quia adipisci!
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem nam quas, similique itaque ad quibusdam cumque quasi
            dolores aliquid porro, nesciunt quo non ab excepturi, nulla saepe
            eveniet quia adipisci!
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem nam quas, similique itaque ad quibusdam cumque quasi
            dolores aliquid porro, nesciunt quo non ab excepturi, nulla saepe
            eveniet quia adipisci!
          </li>
        </ul>
        <Link href={"/about"} className="self-end">
          <CustomButton
            text={t("read_more").toLocaleUpperCase()}
            variant={"secondary"}
            className="p-8 ring"
          />
        </Link>
      </div>
    </div>
  );
}
