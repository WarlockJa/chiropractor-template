import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { useTranslations } from "next-intl";
import SupportedEquipment from "@/components/pages/AboutPractitioner/AboutPractitioner";
import { laptopPC, macBook } from "@/components/temp/ServiceCard/cardData";
import ServiceCard from "@/components/temp/ServiceCard/ServiceCard";

export default function Home() {
  const t = useTranslations("Services");
  const tCard = useTranslations("Cards");

  return (
    <div className="mt-28">
      <HeaderImage
        dbImageName="yts4zql0gte57739lc1m7rzq-laptop.webp"
        className="relative h-96 w-screen"
      >
        {/* brackets */}
        <div className="absolute left-[5%] top-8 h-20 w-20 border-l border-t border-primary-foreground"></div>
        <div className="absolute right-[5%] top-8 h-20 w-20 border-r border-t border-primary-foreground"></div>
        <div className="absolute bottom-8 left-[5%] h-20 w-20 border-b border-l border-primary-foreground"></div>
        <div className="absolute bottom-8 right-[5%] h-20 w-20 border-b border-r border-primary-foreground"></div>

        <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-around text-primary-foreground">
          <h1 className="text-center text-[clamp(2rem,12vw,4rem)] uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]">
            {t("our_services")}
          </h1>
        </div>
      </HeaderImage>

      <section className="mx-auto my-16 flex flex-col items-center justify-between overflow-hidden rounded-xl shadow-xl lg:max-w-screen-lg">
        <SupportedEquipment />
      </section>

      {/* macBook */}
      <section className="my-16" id="macservices">
        <div className="mx-auto max-w-screen-xl">
          <h2 className="text-center text-3xl">{t("mac_repair_center")}</h2>
          <p className="my-4 text-center">{t("repairing_all_mac")}</p>
          <div className="grid grid-flow-row grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {macBook.map((item) => (
              <ServiceCard
                key={item.title}
                title={tCard(item.title)}
                className="aspect-video h-40 w-full lg:h-full"
                href={item.href}
                dbImageName={item.dbImageName}
              />
            ))}
          </div>
        </div>
      </section>

      {/* windows */}
      <section className="mt-16 bg-primary/10 py-8" id="pcservices">
        <div className="mx-auto max-w-screen-xl">
          <h2 className="text-center text-3xl">
            {t("fixing_all_windows_issues")}
          </h2>
          <p className="my-4 text-center">{t("repairing_all_in_ones")}</p>
          <div className="grid grid-flow-row grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {laptopPC.map((item) => (
              <ServiceCard
                key={item.title}
                title={tCard(item.title)}
                className="aspect-video h-40 w-full lg:h-full"
                href={item.href}
                dbImageName={item.dbImageName}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const runtime = "edge";
