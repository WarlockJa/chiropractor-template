import ChangingText from "@/components/UniversalComponents/ChangingText/ChangingText";
import HeaderImage from "@/components/HeaderImage";
import { useTranslations } from "next-intl";
import SupportedEquipment from "@/components/AboutPractitioner/AboutPractitioner";
import SlideinSection from "@/components/UniversalComponents/SlideinSection/SlideinSections";
import CustomHeader from "@/components/CustomHeader";
import HomeAboutUsLeftPanel from "@/components/Home/AboutUsSection/HomeAboutUsLeftPanel";
import HomeAboutUsRightPanel from "@/components/Home/AboutUsSection/HomeAboutUsRightPanel";
import HomeMacLeftPanel from "@/components/Home/MacSection/HomeMacLeftPanel";
import HomeMacRightPanel from "@/components/Home/MacSection/HomeMacRightPanel";
import ContactsFooter from "@/components/ContactsFooter";
import HomeWindowsLeftPanel from "@/components/Home/WindowsSection/HomeWindowsLeftPanel";
import HomeWindowsRightPanel from "@/components/Home/WindowsSection/HomeWindowsRightPanel";
import HeroCarousel from "@/components/Home/HeroCarousel/HeroCarousel";
import CustomImage from "@/components/CustomImage";
import AnimatedText from "@/components/UniversalComponents/AnimatedText";
import { CustomButton } from "@/components/CustomButton";
import Link from "next/link";
import CarouselSlide from "@/components/Home/HeroCarousel/CarouselSlide";
import AboutPractitioner from "@/components/AboutPractitioner/AboutPractitioner";
import ServicesCarousel from "@/components/Home/ServicesCarousel/ServicesCarousel";
import { servicesData } from "@/components/Home/ServicesCarousel/servicesData";
import ServiceCard from "@/components/Home/ServicesCarousel/ServiceCard";

export default function Home() {
  const t = useTranslations("Home");
  const titles = [
    t("hero.titles.1"),
    t("hero.titles.2"),
    t("hero.titles.3"),
    t("hero.titles.4"),
    t("hero.titles.5"),
  ];
  const descriptions = [
    t("hero.descriptions.1"),
    t("hero.descriptions.2"),
    t("hero.descriptions.3"),
    t("hero.descriptions.4"),
    t("hero.descriptions.5"),
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel
        slide1={
          <CarouselSlide dbImageName="r89qsom4ri7mnrqbhdx2mxbu-top-slide1.webp" />
        }
        slide2={
          <CarouselSlide dbImageName="xoa00t9pbc4iuqtpcdbatyu7-top-slide2.webp" />
        }
        slide3={
          <CarouselSlide dbImageName="exogrs7vnwozoytui3rhfz04-top-slide3.webp" />
        }
      />

      {/* About Practitioner */}
      <div className="bg-gradient-to-tr from-background from-60% via-accent to-background">
        <div className="mx-auto grid max-w-screen-xl grid-cols-[2fr,1fr] gap-4 py-20">
          <CustomImage
            dbImageName="djdiuae5tn1sj4lfg4cd76ny-group-photo.webp"
            className="aspect-video max-w-screen-md rounded-md shadow-md shadow-accent"
          />
          {/* <div className="aspect-video max-w-screen-md rounded-md">
        </div> */}
          <AboutPractitioner className="shadow-md shadow-accent" />
        </div>
      </div>

      {/* Services Carousel */}
      <ServicesCarousel
        carouselItems={servicesData.map((item) => (
          <ServiceCard {...item} />
        ))}
      />

      {/* <HeaderImage
        dbImageName="liifjmtbmc1svy1z9ka6mhzm-repair-center.webp"
        className="relative h-screen w-screen"
      >
        <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-around text-primary-foreground">
          <div className="absolute left-[5%] top-24 h-20 w-20 border-l border-t border-primary-foreground"></div>
          <div className="absolute right-[5%] top-24 h-20 w-20 border-r border-t border-primary-foreground"></div>
          <div className="absolute bottom-24 left-[5%] h-20 w-20 border-b border-l border-primary-foreground"></div>
          <div className="absolute bottom-24 right-[5%] h-20 w-20 border-b border-r border-primary-foreground"></div>

          <div>
            <ChangingText
              textArray={titles}
              className="text-[clamp(1rem,10vw,6rem)] font-semibold uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]"
              durationMs={8000}
              center
            />
            <ChangingText
              textArray={descriptions}
              className="text-xl drop-shadow-[3px_3px_1.5px_rgba(0,0,0,0.8)] lg:text-3xl"
              durationMs={8000}
              transitionPercent={15}
              center
            />
          </div>
        </div>
      </HeaderImage> */}

      {/* Short About Us */}
      {/* <SlideinSection
        className="py-8"
        leftContent={<HomeAboutUsLeftPanel />}
        rightContent={<HomeAboutUsRightPanel />}
      /> */}

      {/* Services */}
      {/* <div className="w-screen bg-primary/30 pt-6 md:pt-16">
        <CustomHeader
          text={tServices("our_services").toLocaleUpperCase()}
          fontSizeRem={2}
          className="flex justify-center"
        />
        <SlideinSection
          className="py-8"
          leftContent={<HomeServicesLeftPanel vertical />}
          rightContent={<HomeServicesRightPanel vertical />}
          vertical
        />
      </div> */}

      {/* Supported equipment */}
      {/* <section className="mx-auto my-16 flex flex-col items-center justify-between overflow-hidden rounded-xl shadow-xl lg:max-w-screen-lg">
        <SupportedEquipment />
      </section> */}

      {/* macBook */}
      {/* <div className="w-screen bg-primary/30 pt-6 md:pt-16">
        <CustomHeader
          text={t("mac_repair_center").toUpperCase()}
          fontSizeRem={2}
          className="flex items-center justify-center px-2"
        />
        <CustomHeader
          text={t("repairing_all_mac")}
          className="flex justify-center px-2"
        />
        <SlideinSection
          className="py-8"
          leftContent={<HomeMacLeftPanel vertical />}
          rightContent={<HomeMacRightPanel vertical />}
          vertical
        />
      </div> */}

      {/* windows */}
      {/* <div className="w-screen bg-primary/30 pt-6 md:pt-16">
        <CustomHeader
          text={t("fixing_all_windows_issues").toUpperCase()}
          fontSizeRem={2}
          className="flex items-center justify-center px-2"
        />
        <CustomHeader
          text={t("repairing_all_in_ones")}
          className="flex justify-center px-2"
        />
        <SlideinSection
          className="py-8"
          leftContent={<HomeWindowsLeftPanel vertical />}
          rightContent={<HomeWindowsRightPanel vertical />}
          vertical
        />
      </div> */}

      {/* Footer Contact */}
      {/* <ContactsFooter /> */}
    </div>
  );
}

export const runtime = "edge";
