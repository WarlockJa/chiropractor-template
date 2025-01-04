import NextLink from "next/link";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import YoutubeIcon from "@/components/Icons/YoutubeIcon";
import { brandFB, brandIG, brandName, brandX, brandYT } from "@/appConfig";
import { useTranslations } from "next-intl";
import Link from "next/link";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import { servicesData } from "../Services/servicesData";

export default function Footer() {
  const tFooter = useTranslations("Footer");
  const tServices = useTranslations("Services");
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
            <CustomServerImage dbImageName="tmanbs9ofqhp14okq8xvx59f-logo_alpha_pink.png" />
          </div>
        </Link>

        {/* Services Links */}
        <div className="flex flex-col gap-4 p-2 pl-12 xsm:pl-2">
          <h1 className="bg-gradient-to-b from-secondary-foreground to-accent bg-clip-text text-xl text-transparent">
            {tFooter("services")}
          </h1>
          {/* <div className="flex w-fit flex-col gap-4 text-sm"> */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {servicesData.map((item) => (
              <Link
                key={item.path}
                className="transition-colors hover:text-accent"
                href={item.href}
              >
                {tServices(`${item.path}.title`)}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 p-2 pl-12 xsm:pl-2">
          <h1 className="bg-gradient-to-b from-secondary-foreground to-accent bg-clip-text text-xl text-transparent">
            {tFooter("quick_links")}
          </h1>
          <div className="flex w-fit flex-col gap-4 text-sm">
            <Link className="transition-colors hover:text-accent" href={"/"}>
              {tFooter("home")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/about"}
            >
              {tFooter("about")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/services"}
            >
              {tFooter("services")}
            </Link>
            <Link
              className="transition-colors hover:text-accent"
              href={"/contacts"}
            >
              {tFooter("contacts")}
            </Link>
          </div>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-4 p-2 pl-12 xsm:pl-2">
          <h1 className="bg-gradient-to-b from-secondary-foreground to-accent bg-clip-text text-xl text-transparent">
            {tFooter("follow_us")}
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
          &#169;2024 {brandName} {tFooter("rights_reserved")}
        </div>
        <div className="flex flex-1 flex-wrap justify-center gap-4">
          <Link
            className="transition-colors hover:text-accent"
            href={"/privacy-policy"}
          >
            {tFooter("privacy_policy")}
          </Link>
          <Link
            className="transition-colors hover:text-accent"
            href={"/disclaimer"}
          >
            {tFooter("disclaimer")}
          </Link>
        </div>
        <div className="text-right">
          {tFooter("developed_by")}{" "}
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
