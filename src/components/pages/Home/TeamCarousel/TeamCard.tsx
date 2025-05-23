import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { TeamData } from "./testimonialsData";
import Link from "next/link";
import WhatsAppIcon from "@/components/Icons/WhatsAppIcon";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import { CustomButton } from "@/components/UniversalComponents/CustomButton";
import { useTranslations } from "next-intl";

export default function TeamCard({
  employee,
  dbImageName,
  href,
  facebook,
  instagram,
  twitter,
  whatsapp,
}: TeamData) {
  const tOurTeam = useTranslations("OurTeam");
  const tHeaders = useTranslations("Headers");
  return (
    <div className="grid gap-4 md:grid-cols-[1fr,1px,1fr]">
      <div className="flex w-full flex-col items-center">
        <CustomServerImage
          dbImageName={dbImageName}
          className="w-screen max-w-full rounded-full"
        />
      </div>
      <div className="h-full bg-gradient-to-b from-background via-foreground to-background"></div>
      <div className="mx-auto flex max-w-screen-xsm flex-col items-center gap-2 px-2">
        <div className="text-3xl">{tOurTeam(`${employee}.name`)}</div>
        <div className="h-0.5 w-40 bg-gradient-to-r from-background via-accent to-background"></div>
        <div className="text-lg">{tOurTeam(`${employee}.title`)}</div>
        <div className="flex justify-end gap-4">
          {whatsapp && (
            <Link target="_blank" href={`https://wa.me/${whatsapp}`}>
              <WhatsAppIcon className="h-8 w-8 fill-accent transition-all hover:fill-green-600 hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
            </Link>
          )}
          {facebook && (
            <Link target="_blank" href={facebook}>
              <FacebookIcon className="h-8 w-8 fill-accent transition-all hover:fill-blue-600 hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
            </Link>
          )}
          {twitter && (
            <Link target="_blank" href={twitter}>
              <TwitterIcon className="h-8 w-8 fill-accent transition-all hover:fill-black hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
            </Link>
          )}
          {instagram && (
            <Link target="_blank" href={instagram}>
              <InstagramIcon className="h-8 w-8 fill-accent transition-all hover:fill-red-400 hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
            </Link>
          )}
        </div>
        <div className="max-h-52 overflow-y-scroll">
          <div className="my-4 w-screen max-w-screen-xsm px-2 indent-8 text-muted-foreground">
            {tOurTeam(`${employee}.quote`)}
          </div>
        </div>
        <Link href={href} className="md:mt-auto">
          <CustomButton
            text={tHeaders("view_profile").toLocaleUpperCase()}
            className="border-2 border-accent p-6 hover:bg-accent/5"
            textClassName="md:text-2xl p-2"
          />
        </Link>
      </div>
    </div>
  );
}
