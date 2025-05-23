import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomHeader from "@/components/UniversalComponents/CustomHeader";
import { Mail, MapPin, Smartphone } from "lucide-react";
import {
  brandAddress,
  brandEmail,
  brandMapDirectionsLink,
  brandPhone,
  brandWhatsApp,
} from "@/appConfig";
import WhatsAppIcon from "@/components/Icons/WhatsAppIcon";
import { CustomButton } from "@/components/UniversalComponents/CustomButton";

export default async function ContactsFooter() {
  const tHeaders = await getTranslations("Headers");
  return (
    <HeaderImage
      dbImageName="gotpr60kksd5ws1zz11nzmgj-map.png"
      containerClassName="relative h-[44em] w-screen md:h-[32em]"
    >
      <div className="absolute inset-0 dark:bg-background/70"></div>
      <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-center gap-8">
        <Card className="mx-auto max-w-screen-xl">
          <CardHeader className="p-8">
            <CardDescription className="text-center text-xl text-accent">
              {tHeaders("how_you_can_find_us").toLocaleUpperCase()}
            </CardDescription>
            <CardTitle>
              <CustomHeader
                text={tHeaders("our_contacts").toLocaleUpperCase()}
                fontSizeRem={3}
                className="flex justify-center"
                textClassName="font-extralight"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="mx-auto grid justify-center font-sans md:grid-cols-[1fr,1px,1fr,1px,1fr,1px,1fr]">
            <Link
              href={brandMapDirectionsLink}
              target="_blank"
              className="flex flex-col items-center"
            >
              <div className="font-sans text-5xl font-bold text-accent">
                <MapPin size={40} />
              </div>
              <div className="text-center">{brandAddress}</div>
            </Link>
            <div className="m-2 h-0.5 w-full bg-gradient-to-r from-background via-foreground to-background md:m-0 md:h-full md:bg-gradient-to-b"></div>
            <Link
              href={`tel:${brandPhone.number}`}
              className="flex flex-col items-center"
              target="_blank"
            >
              <div className="font-sans text-5xl font-bold text-accent">
                <Smartphone size={40} />
              </div>
              <div className="text-center">{brandPhone.string}</div>
            </Link>
            <div className="m-2 h-0.5 w-full bg-gradient-to-r from-background via-foreground to-background md:m-0 md:h-full md:bg-gradient-to-b"></div>
            <Link
              href={`mailto:${brandEmail}`}
              className="flex flex-col items-center"
              target="_blank"
            >
              <div className="font-sans text-5xl font-bold text-accent">
                <Mail size={40} />
              </div>
              <div className="text-center">{brandEmail}</div>
            </Link>
            <div className="m-2 h-0.5 w-full bg-gradient-to-r from-background via-foreground to-background md:m-0 md:h-full md:bg-gradient-to-b"></div>
            <Link
              href={`https://wa.me/${brandWhatsApp.number}`}
              className="flex flex-col items-center"
              target="_blank"
            >
              <WhatsAppIcon className="h-9 w-9 fill-accent" />
              {brandWhatsApp.string}
            </Link>
          </CardContent>
        </Card>

        {/* <h1 className="mb-8 text-center text-3xl uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)] md:text-5xl">
          {t("footer_title")}
        </h1> */}
        <Link href={"/contacts"}>
          <CustomButton
            text={tHeaders("make_an_appointment").toLocaleUpperCase()}
            className="border-2 border-accent p-8 hover:bg-accent/5"
            textClassName="md:text-4xl p-2"
          />
          {/* <CustomButton
            text={"Make an appointment"}
            variant={"secondary"}
            className="p-8 ring"
            textClassName="md:text-3xl"
          /> */}
        </Link>
      </div>
    </HeaderImage>
  );
}
