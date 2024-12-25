import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import GoogleReviews from "@/components/UniversalComponents/GoogleMaps/GoogleReviews";
import { Locale } from "@/i18n/config";
import getCachedGoogleData from "@/lib/cache/getCachedGoogleData";
import { getLocale, getTranslations } from "next-intl/server";
import { env } from "@/lib/env.mjs";
import { brandPlaceId } from "@/appConfig";
import CustomHeader from "@/components/UniversalComponents/CustomHeader";
import SlideinSection from "@/components/UniversalComponents/SlideinSection/SlideinSections";
import ContactsFooter from "@/components/pages/ContactsFooter";

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
    <div className="mt-28">
      <HeaderImage
        dbImageName="rmg62f1nfm2ohghvf9qx7py6-beach-laptop.webp"
        className="relative h-96 w-screen"
      >
        <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-around text-primary-foreground">
          <h1 className="text-center text-[clamp(2rem,12vw,4rem)] uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]">
            {t("about")}
          </h1>
        </div>
      </HeaderImage>

      {/* Google reviews */}
      <div className="w-screen bg-primary/30 md:py-16">
        <CustomHeader
          text={t("what_people_say")}
          className="flex justify-center px-2"
          fontSizeRem={3}
        />
        <section className="mx-auto flex flex-col items-center justify-between overflow-hidden">
          <GoogleReviews
            locale={locale}
            placeInfo={placeInfo.status === "OK" ? placeInfo.result : undefined}
          />
        </section>
      </div>

      {/* Our Goals */}
      <div className="w-screen md:py-16">
        <CustomHeader
          text={t("our_goals")}
          className="flex justify-center px-2"
          fontSizeRem={3}
        />

        <SlideinSection
          className="my-8"
          leftContent={
            <div className="flex h-full items-center justify-center bg-primary-foreground p-8">
              <div className="ml-auto max-w-screen-sm">
                <CustomHeader
                  text={t("your_computer_our_priority")}
                  className="flex justify-center text-primary"
                  fontSizeRem={2}
                />
              </div>
            </div>
          }
          rightContent={
            <div className="flex h-full items-center justify-center bg-primary/80 p-8">
              <div className="mr-auto max-w-screen-sm">
                <CustomHeader
                  text={t("is_your_computer_slow")}
                  className="flex justify-center leading-8 text-primary-foreground"
                />
              </div>
            </div>
          }
        />
        <SlideinSection
          className="my-8"
          leftContent={
            <div className="flex h-full items-center justify-center bg-primary/80 p-8">
              <div className="ml-auto max-w-screen-sm">
                <CustomHeader
                  text={t("dont_let_malfunction_disrupt")}
                  className="flex justify-center leading-8 text-primary-foreground"
                />
              </div>
            </div>
          }
          rightContent={
            <div className="flex h-full items-center justify-center bg-primary-foreground p-8">
              <div className="mr-auto max-w-screen-sm">
                <CustomHeader
                  text={t("breathe_new_life_into_your_device")}
                  className="flex justify-center text-primary"
                  fontSizeRem={2}
                />
              </div>
            </div>
          }
          reverse
        />
        <SlideinSection
          className="my-8"
          leftContent={
            <div className="flex h-full items-center justify-center bg-primary-foreground p-8">
              <div className="ml-auto max-w-screen-sm">
                <CustomHeader
                  text={t("your_local_tech_experts")}
                  className="flex justify-center text-primary"
                  fontSizeRem={2}
                />
              </div>
            </div>
          }
          rightContent={
            <div className="flex h-full items-center justify-center bg-primary/80 p-8">
              <div className="mr-auto max-w-screen-sm">
                <CustomHeader
                  text={t("were_not_just_a_repair_shop")}
                  className="flex justify-center leading-8 text-primary-foreground"
                />
              </div>
            </div>
          }
        />
      </div>

      {/* Footer Contact */}
      <ContactsFooter />
    </div>
  );
}

export const runtime = "edge";
