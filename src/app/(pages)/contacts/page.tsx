import { brandCoordinates, brandPlaceId } from "@/appConfig";
import GoogleMaps from "@/components/UniversalComponents/GoogleMaps/GoogleMaps";
import { env } from "@/lib/env.mjs";
import AddressCard from "./_components/AddressCard";
import getCachedGoogleData from "@/lib/cache/getCachedGoogleData";
import { getLocale, getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm/ContactForm";
import { Locale } from "@/i18n/config";
import CustomImage from "@/components/CustomImage";
import HeaderImage from "@/components/HeaderImage";

export default async function ContactPage() {
  // translations
  const t = await getTranslations("Contacts");
  const locale = (await getLocale()) as Locale;
  // getting cached Google Maps data
  const cachedGoogleData = await getCachedGoogleData({
    placeId: brandPlaceId,
    key: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    language: locale,
  });
  const placeInfo = await cachedGoogleData();

  return (
    <section className="mt-32">
      <div className="mx-auto my-8 flex w-full flex-col items-start gap-2 md:flex-row md:items-stretch lg:max-w-screen-lg">
        <GoogleMaps
          coordinates={brandCoordinates}
          placeInfo={placeInfo.status === "OK" ? placeInfo.result : undefined}
          pinchild={
            <CustomImage dbImageName="o3uowmy2saktgyo5d7u6iu3m-icon.webp" />
          }
        />
        <AddressCard />
      </div>
      <HeaderImage
        className="relative h-[43em] w-screen lg:h-[40em]"
        dbImageName="vogdhqtxfngbldic0vvwpdvb-support.webp"
      >
        <ContactForm />
      </HeaderImage>
    </section>
  );
}

export const runtime = "edge";
