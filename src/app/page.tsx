import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import CustomHeader from "@/components/UniversalComponents/CustomHeader";
import ContactsFooter from "@/components/pages/ContactsFooter";
import HeroCarousel from "@/components/pages/Home/HeroCarousel/HeroCarousel";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import CarouselSlide from "@/components/pages/Home/HeroCarousel/CarouselSlide";
import AboutPractitioner from "@/components/pages/AboutPractitioner/AboutPractitioner";
import ServicesCarousel from "@/components/pages/Home/ServicesCarousel/ServicesCarousel";
import { servicesData } from "@/components/pages/Services/servicesData";
import ServiceCard from "@/components/pages/Home/ServicesCarousel/ServiceCard";
import TestimonialsCarousel from "@/components/pages/TestimonialsCarousel/TestimonialsCarousel";
import { testimonialsData } from "@/components/pages/TestimonialsCarousel/testimonialsData";
import TestimonialCard from "@/components/pages/TestimonialsCarousel/TestimonialCard";
import TeamCarousel from "@/components/pages/Home/TeamCarousel/TeamCarousel";
import { teamData } from "@/components/pages/Home/TeamCarousel/testimonialsData";
import TeamCard from "@/components/pages/Home/TeamCarousel/TeamCard";
import LatestBlogsFeed from "@/components/pages/Blog/LatestBlogsFeed";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const tHeaders = await getTranslations("Headers");

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
          <CustomServerImage
            dbImageName="djdiuae5tn1sj4lfg4cd76ny-group-photo.webp"
            className="aspect-video max-w-screen-md rounded-md shadow-md shadow-accent"
          />
          <AboutPractitioner className="max-w-screen-sm shadow-md shadow-accent" />
        </div>
      </div>

      {/* Services Carousel */}
      <div className="flex flex-col items-center pt-20">
        <div className="text-xl text-accent">
          {tHeaders("what_we_can_offer").toLocaleUpperCase()}
        </div>
        <CustomHeader
          text={tHeaders("our_services").toLocaleUpperCase()}
          fontSizeRem={3}
        />
      </div>
      <ServicesCarousel
        carouselItems={servicesData.map((item) => (
          <ServiceCard key={item.title} {...item} />
        ))}
        className="my-12"
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

      {/* Blog Feed */}
      <div className="mx-auto my-12 flex w-screen max-w-screen-lg flex-col items-center gap-6 p-2">
        <CustomHeader
          text={tHeaders("latest_from_blog").toLocaleUpperCase()}
          fontSizeRem={2}
        />
        <LatestBlogsFeed className="flex flex-col gap-4" />
      </div>

      {/* Our Team */}
      <div className="flex flex-col items-center py-20">
        <div className="text-xl text-accent">
          {tHeaders("nice_to_meet_you").toLocaleUpperCase()}
        </div>
        <CustomHeader
          text={tHeaders("our_team").toLocaleUpperCase()}
          fontSizeRem={3}
        />
        <TeamCarousel
          delayMs={5000}
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
