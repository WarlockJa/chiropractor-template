import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { useTranslations } from "next-intl";
import { servicesData } from "@/components/pages/Home/ServicesCarousel/servicesData";
import ServiceCardList from "@/components/temp/ServiceCardList/ServiceCardList";
import CustomImage from "@/components/UniversalComponents/CustomImage";

export default function Home() {
  const t = useTranslations("Services");

  return (
    <div className="mt-28">
      <HeaderImage
        dbImageName="qmhs5989heoch1m3893x3ple-services.webp"
        className="relative h-96 w-screen"
      >
        <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-around">
          <h1 className="text-center text-[clamp(2rem,12vw,4rem)] uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]">
            {t("our_services")}
          </h1>
        </div>
      </HeaderImage>

      <div className="mx-auto grid w-screen max-w-screen-xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((item) => (
          <ServiceCardList
            key={item.title}
            {...item}
            image={<CustomImage dbImageName={item.dbImageName} />}
          />
        ))}
      </div>
    </div>
  );
}

export const runtime = "edge";
