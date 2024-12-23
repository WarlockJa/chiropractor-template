import NextLink from "next/link";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import YoutubeIcon from "@/components/Icons/YoutubeIcon";
import { ExternalLink, Mail, Phone } from "lucide-react";
import {
  brandAddress,
  brandEmail,
  brandFB,
  brandIG,
  brandMapDirectionsLink,
  brandName,
  brandPhone,
  brandWhatsApp,
  brandX,
  brandYT,
} from "@/appConfig";
import { useTranslations } from "next-intl";
import WhatsAppIcon from "@/components/Icons/WhatsAppIcon";
import Link from "next/link";
import CustomImage from "@/components/CustomImage";
import InstagramIcon from "@/components/Icons/InstagramIcon";

export default function Footer() {
  const t = useTranslations("Footer");
  const tCards = useTranslations("Cards");
  return (
    <footer className="flex flex-col items-center bg-secondary text-lg text-secondary-foreground">
      {/* Footer body */}
      <div className="flex w-full max-w-screen-lg flex-wrap items-start gap-4 pt-4 xsm:justify-center">
        {/* Logo */}
        <Link
          href={"/"}
          className="mx-auto flex flex-col items-center gap-8 p-2 text-3xl"
        >
          <h3 className="text-2xl">{brandName}</h3>
          <div className="h-28">
            {/* TEST logo.webp */}
            <CustomImage dbImageName="o3uowmy2saktgyo5d7u6iu3m-icon.webp" />
          </div>
        </Link>

        {/* Services Links */}
        <div className="flex flex-col gap-4 p-2 pl-12 xsm:pl-2">
          <h1 className="bg-gradient-to-b from-secondary-foreground to-accent bg-clip-text text-xl text-transparent">
            {t("services")}
          </h1>
          <div className="flex w-fit flex-col gap-4 text-sm">
            <Link
              className="transition-colors hover:text-accent"
              href={"/contacts"}
            >
              {tCards("repair_center")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/services/data-recovery"}
            >
              {tCards("data_recovery")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/services/remote-support"}
            >
              {tCards("remote_it_support")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/services/on-site"}
            >
              {tCards("onsite_tech_visit")}
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 p-2 pl-12 xsm:pl-2">
          <h1 className="bg-gradient-to-b from-secondary-foreground to-accent bg-clip-text text-xl text-transparent">
            {t("quick_links")}
          </h1>
          <div className="flex w-fit flex-col gap-4 text-sm">
            <Link className="transition-colors hover:text-accent" href={"/"}>
              {t("home")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/about"}
            >
              {t("about")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/services"}
            >
              {t("services")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/contacts"}
            >
              {t("contacts")}
            </Link>
          </div>
        </div>

        {/* Get in Touch */}
        {/* <div className="mx-auto flex flex-col items-center gap-4 p-2 xsm:items-start">
          <h1 className="bg-gradient-to-b from-secondary-foreground to-accent bg-clip-text text-xl text-transparent">
            {t("get_in_touch")}
          </h1>
          <div className="flex w-fit flex-col gap-4 text-sm">
            <div className="text-xl">{brandName}</div>
            <div className="">{brandAddress[0]}</div>
            <div className="">{brandAddress[1]}</div>
            <div className="">{brandAddress[2]}</div>
            <NextLink
              href={`tel:${brandPhone.number}`}
              className="flex items-center gap-2 underline underline-offset-8 transition-colors hover:text-accent"
            >
              <Phone />
              {brandPhone.string}
            </NextLink>
            <NextLink
              href={`mailto:${brandEmail}`}
              className="flex items-center gap-2 underline underline-offset-8 transition-colors hover:text-accent"
            >
              <Mail />
              {brandEmail}
            </NextLink>
            <NextLink
              href={`https://wa.me/${brandWhatsApp}`}
              className="flex items-center gap-2 underline underline-offset-8 transition-colors hover:text-accent"
            >
              <WhatsAppIcon className="h-6 w-6 fill-secondary-foreground" />
              {brandWhatsApp}
            </NextLink>
            <NextLink
              href={brandMapDirectionsLink}
              target="_blank"
              className="flex items-center gap-2 underline underline-offset-4 transition-colors hover:text-accent"
            >
              <ExternalLink /> {t("map_directions")}
            </NextLink>
          </div>
        </div> */}

        {/* Social */}
        <div className="flex flex-col gap-4 p-2 pl-12 xsm:pl-2">
          <h1 className="bg-gradient-to-b from-secondary-foreground to-accent bg-clip-text text-xl text-transparent">
            {t("follow_us")}
          </h1>
          <div className="flex gap-8 py-4 text-sm">
            <Link href={brandX} target="_blank">
              <TwitterIcon className="h-6 w-6 fill-secondary-foreground transition-opacity hover:opacity-80" />
            </Link>
            <Link href={brandFB} target="_blank">
              <FacebookIcon className="h-6 w-6 fill-secondary-foreground transition-opacity hover:opacity-80" />
            </Link>
            <Link href={brandYT} target="_blank">
              <YoutubeIcon className="h-6 w-6 fill-secondary-foreground transition-opacity hover:opacity-80" />
            </Link>
            <Link target="_blank" href={brandIG}>
              <InstagramIcon className="h-6 w-6 fill-secondary-foreground transition-opacity hover:opacity-80" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer footer */}
      <div className="flex w-full max-w-screen-xl flex-col items-center justify-around gap-3 p-2 text-xs md:flex-row md:p-8">
        <div>
          {/* &#169;{new Date().getFullYear()} {brandName} {t("rights_reserved")} */}
          &#169;2024 {brandName} {t("rights_reserved")}
        </div>
        <div className="flex flex-1 flex-wrap justify-center gap-4">
          <Link
            className="transition-colors hover:text-accent"
            href={"/privacy-policy"}
          >
            {t("privacy_policy")}
          </Link>
          <Link
            className="transition-colors hover:text-accent"
            href={"/disclaimer"}
          >
            {t("disclaimer")}
          </Link>
        </div>
        <div className="text-right">
          {t("developed_by")}{" "}
          <NextLink
            target="_about"
            href={"https://warlockja.com"}
            className="transition-opacity hover:text-accent"
          >
            WarlockJa
          </NextLink>
        </div>
      </div>
    </footer>
  );
}
