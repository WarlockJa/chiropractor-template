import HeaderImage from "@/components/UniversalComponents/HeaderImage";
// import GoogleReviews from "@/components/UniversalComponents/GoogleMaps/GoogleReviews";
import { Locale } from "@/i18n/config";
import getCachedGoogleData from "@/lib/cache/getCachedGoogleData";
import { getLocale, getTranslations } from "next-intl/server";
import { env } from "@/lib/env.mjs";
import { brandPlaceId } from "@/appConfig";
import CustomHeader from "@/components/UniversalComponents/CustomHeader";
import SlideinSection from "@/components/UniversalComponents/SlideinSection/SlideinSections";
import ContactsFooter from "@/components/pages/ContactsFooter";
import AboutPractitioner from "@/components/pages/AboutPractitioner/AboutPractitioner";
import TestimonialsCarousel from "@/components/pages/TestimonialsCarousel/TestimonialsCarousel";
import { testimonialsData } from "@/components/pages/TestimonialsCarousel/testimonialsData";
import TestimonialCard from "@/components/pages/TestimonialsCarousel/TestimonialCard";

export default async function AboutPage() {
  const t = await getTranslations("About");
  const locale = (await getLocale()) as Locale;
  const cachedGoogleData = await getCachedGoogleData({
    key: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    placeId: brandPlaceId,
    language: locale,
  });
  const placeInfo = await cachedGoogleData();
  return (
    <div className="mt-24 md:mt-28">
      <HeaderImage
        dbImageName="f9umjtc5n9r6d4tct6tk98p3-group-photo-short.webp"
        containerClassName="relative h-96 w-screen max-w-screen-2xl mx-auto"
      >
        <div className="absolute inset-auto h-full w-full flex-col">
          <h1 className="bg-accent/50 px-4 text-center text-[clamp(2rem,12vw,4rem)] uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]">
            {t("about")}
          </h1>
        </div>
      </HeaderImage>

      {/* Our Goals */}
      <div className="md:py-20">
        <CustomHeader
          text={t("our_goals")}
          className="mb-8 flex justify-center px-2"
          fontSizeRem={3}
        />

        <SlideinSection
          className="min-h-96"
          leftContent={
            <div className="flex h-full items-center justify-center bg-accent/20 p-8">
              <div className="ml-auto max-w-screen-sm">
                <CustomHeader
                  text={"Lorem ipsum"}
                  className="flex justify-center"
                  fontSizeRem={2}
                />
              </div>
            </div>
          }
          rightContent={
            <div className="flex h-full items-center justify-center p-8">
              <div className="mr-auto max-w-screen-sm">
                <CustomHeader
                  text={
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse rerum cupiditate perferendis maxime quos voluptates quibusdam natus culpa repellendus similique laudantium quidem cum tempora ratione sed, aliquid vel fugit quia."
                  }
                  className="flex justify-center leading-8"
                />
              </div>
            </div>
          }
        />
        <SlideinSection
          className="min-h-96"
          leftContent={
            <div className="flex h-full items-center justify-center p-8">
              <div className="ml-auto max-w-screen-sm">
                <CustomHeader
                  text={
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse rerum cupiditate perferendis maxime quos voluptates quibusdam natus culpa repellendus similique laudantium quidem cum tempora ratione sed, aliquid vel fugit quia."
                  }
                  className="flex justify-center leading-8"
                />
              </div>
            </div>
          }
          rightContent={
            <div className="flex h-full items-center justify-center bg-accent/20 p-8">
              <div className="mr-auto max-w-screen-sm">
                <CustomHeader
                  text={"Lorem ipsum"}
                  className="flex justify-center"
                  fontSizeRem={2}
                />
              </div>
            </div>
          }
          reverse
        />
        <SlideinSection
          className="min-h-96"
          leftContent={
            <div className="flex h-full items-center justify-center bg-accent/20 p-8">
              <div className="ml-auto max-w-screen-sm">
                <CustomHeader
                  text={"Lorem ipsum"}
                  className="flex justify-center"
                  fontSizeRem={2}
                />
              </div>
            </div>
          }
          rightContent={
            <div className="flex h-full items-center justify-center bg-primary/80 p-8">
              <div className="mr-auto max-w-screen-sm">
                <CustomHeader
                  text={
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse rerum cupiditate perferendis maxime quos voluptates quibusdam natus culpa repellendus similique laudantium quidem cum tempora ratione sed, aliquid vel fugit quia."
                  }
                  className="flex justify-center leading-8"
                />
              </div>
            </div>
          }
        />
      </div>
      {/* About Practitioner */}
      <div className="mx-auto w-screen max-w-screen-lg">
        <AboutPractitioner />
      </div>

      {/* Google reviews */}
      <div className="w-screen bg-primary/30 pt-20">
        {/* <CustomHeader
          text={t("what_people_say")}
          className="flex justify-center px-2"
          fontSizeRem={3}
        /> */}
        {/* <section className="mx-auto flex flex-col items-center justify-between overflow-hidden">
          <GoogleReviews
            locale={locale}
            placeInfo={placeInfo.status === "OK" ? placeInfo.result : undefined}
          />
        </section> */}
      </div>
      {/* Testimonials */}
      <HeaderImage
        dbImageName="nldbl1esytsx2lg47trp4mac-bg-1.jpg"
        containerClassName="relative h-[48em] sm:h-[40em] w-screen"
        className="flex flex-col"
      >
        <CustomHeader
          text={t("what_people_say")}
          className="z-10 flex justify-center px-2"
          fontSizeRem={3}
          textClassName="text-foreground"
        />
        <div className="absolute inset-0 dark:bg-background/70"></div>
        <TestimonialsCarousel
          carouselItems={testimonialsData.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
          className="mx-auto my-4 w-screen max-w-screen-lg"
        />
      </HeaderImage>

      {/* Footer Contact */}
      <ContactsFooter />
    </div>
  );
}

export const runtime = "edge";
