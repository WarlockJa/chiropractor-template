import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { useTranslations } from "next-intl";
import { servicesData } from "@/components/pages/Services/servicesData";
import ServiceCardList from "@/components/pages/Services/ServiceCardList/ServiceCardList";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";

export default function Home() {
  const t = useTranslations("Services");

  return (
    <div className="mt-24 md:mt-28">
      <HeaderImage
        dbImageName="qmhs5989heoch1m3893x3ple-services.webp"
        containerClassName="relative h-96 w-screen max-w-screen-2xl mx-auto"
      >
        <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-around">
          <h1 className="bg-accent/50 px-4 text-center text-[clamp(2rem,12vw,4rem)] uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]">
            {t("our_services")}
          </h1>
        </div>
      </HeaderImage>

      <div className="mx-auto grid w-screen max-w-screen-lg gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((item) => (
          <ServiceCardList
            key={item.title}
            href={item.href}
            title={item.title}
            image={<CustomServerImage dbImageName={item.dbImageName} />}
          />
        ))}
      </div>
    </div>
  );
}

export const runtime = "edge";
