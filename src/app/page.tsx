import ChangingText from "@/components/UniversalComponents/ChangingText/ChangingText";
import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { useTranslations } from "next-intl";
import SupportedEquipment from "@/components/pages/AboutPractitioner/AboutPractitioner";
import SlideinSection from "@/components/UniversalComponents/SlideinSection/SlideinSections";
import CustomHeader from "@/components/UniversalComponents/CustomHeader";
import HomeAboutUsLeftPanel from "@/components/temp/AboutUsSection/HomeAboutUsLeftPanel";
import HomeAboutUsRightPanel from "@/components/temp/AboutUsSection/HomeAboutUsRightPanel";
import ContactsFooter from "@/components/pages/ContactsFooter";
import HeroCarousel from "@/components/pages/Home/HeroCarousel/HeroCarousel";
import CustomImage from "@/components/UniversalComponents/CustomImage";
import AnimatedText from "@/components/UniversalComponents/AnimatedText";
import { CustomButton } from "@/components/UniversalComponents/CustomButton";
import Link from "next/link";
import CarouselSlide from "@/components/pages/Home/HeroCarousel/CarouselSlide";
import AboutPractitioner from "@/components/pages/AboutPractitioner/AboutPractitioner";
import ServicesCarousel from "@/components/pages/Home/ServicesCarousel/ServicesCarousel";
import { servicesData } from "@/components/pages/Home/ServicesCarousel/servicesData";
import ServiceCard from "@/components/pages/Home/ServicesCarousel/ServiceCard";
import TestimonialsCarousel from "@/components/pages/TestimonialsCarousel/TestimonialsCarousel";
import { testimonialsData } from "@/components/pages/TestimonialsCarousel/testimonialsData";
import TestimonialCard from "@/components/pages/TestimonialsCarousel/TestimonialCard";
import TeamCarousel from "@/components/pages/Home/TeamCarousel/TeamCarousel";
import { teamData } from "@/components/pages/Home/TeamCarousel/testimonialsData";
import TeamCard from "@/components/pages/Home/TeamCarousel/TeamCard";

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
    <div className="overflow-hidden">
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
        <div className="mx-auto grid max-w-screen-xl justify-center py-20 md:gap-4 lg:grid-cols-[2fr,1fr]">
          <CustomImage
            dbImageName="djdiuae5tn1sj4lfg4cd76ny-group-photo.webp"
            className="aspect-video max-w-screen-md rounded-md shadow-md shadow-accent"
          />
          {/* <div className="aspect-video max-w-screen-md rounded-md">
        </div> */}
          <AboutPractitioner className="max-w-screen-sm shadow-md shadow-accent" />
        </div>
      </div>

      {/* Services Carousel */}
      <div className="flex flex-col items-center pt-20">
        <div className="text-xl text-accent">WHAT WE CAN OFFER</div>
        <CustomHeader text="OUR SERVICES" fontSizeRem={3} />
      </div>
      <ServicesCarousel
        carouselItems={servicesData.map((item) => (
          <ServiceCard key={item.title} {...item} />
        ))}
        className="my-20"
      />

      {/* Testimonials */}
      <HeaderImage
        dbImageName="nldbl1esytsx2lg47trp4mac-bg-1.jpg"
        containerClassName="relative h-[36em] w-screen"
      >
        <div className="absolute inset-0 dark:bg-background/70"></div>
        <TestimonialsCarousel
          carouselItems={testimonialsData.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
          className="mx-auto my-20 w-screen max-w-screen-lg"
        />
      </HeaderImage>

      {/* Our Team */}
      <div className="flex flex-col items-center py-20">
        <div className="text-xl text-accent">NICE TO MEET YOU</div>
        <CustomHeader text="OUR TEAM" fontSizeRem={3} />
        <TeamCarousel
          carouselItems={teamData.map((item, index) => (
            <TeamCard key={index} {...item} />
          ))}
        />
      </div>

      {/* Footer Contact */}
      <ContactsFooter />
    </div>
  );
}

export const runtime = "edge";
