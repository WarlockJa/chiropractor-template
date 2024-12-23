import React from "react";
import {
  brandAddress,
  brandEmail,
  brandFB,
  brandIG,
  brandPhone,
  brandWhatsApp,
  brandWorkHours,
  brandX,
  brandYT,
} from "@/appConfig";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import YoutubeIcon from "@/components/Icons/YoutubeIcon";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/Icons/WhatsAppIcon";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ContactsPanel() {
  const t = useTranslations("ContactsPanel");
  return (
    <div className="flex w-full items-center justify-center gap-8 bg-[hsl(var(--almost-black))] text-sm text-[hsl(var(--almost-white))]">
      {/* socials */}
      <div className="flex justify-center gap-4">
        <Link target="_blank" href={brandFB}>
          <FacebookIcon className="h-5 w-5 fill-[hsl(var(--almost-white))] transition-opacity hover:opacity-80" />
        </Link>
        <Link target="_blank" href={brandYT}>
          <YoutubeIcon className="h-5 w-5 fill-[hsl(var(--almost-white))] transition-opacity hover:opacity-80" />
        </Link>
        <Link target="_blank" href={brandX}>
          <TwitterIcon className="h-5 w-5 fill-[hsl(var(--almost-white))] transition-opacity hover:opacity-80" />
        </Link>
        <Link target="_blank" href={brandIG}>
          <InstagramIcon className="h-5 w-5 fill-[hsl(var(--almost-white))] transition-opacity hover:opacity-80" />
        </Link>
      </div>

      {/* contacts */}
      <div className="flex gap-4">
        <Link
          className="flex gap-2 transition-opacity hover:opacity-80"
          target="_blank"
          href={`mailto:${brandEmail}`}
        >
          <Mail size={20} /> <div className="hidden md:block">{brandEmail}</div>
        </Link>
        <Link
          className="flex gap-2 transition-opacity hover:opacity-80"
          target="_blank"
          href={`tel:${brandPhone.number}`}
        >
          <Phone size={20} />{" "}
          <div className="hidden md:block">{brandPhone.string}</div>
        </Link>
        <Link
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          target="_blank"
          href={`https://wa.me/${brandWhatsApp}`}
        >
          <WhatsAppIcon className="h-5 w-5 fill-[hsl(var(--almost-white))]" />
          <div className="hidden md:block">{brandWhatsApp}</div>
        </Link>
      </div>

      <div className="flex gap-2">
        <Link
          className="flex items-center gap-2 hover:opacity-80"
          href={"/contacts"}
        >
          <MapPin size={24} />
          <span className="hidden xl:block">{`${brandAddress[0]} ${brandAddress[1]}`}</span>
        </Link>
        <div className="hidden items-center gap-2 lg:flex">
          <Clock size={20} />
          {brandWorkHours}
          {t("brand_weekend_closed")}
        </div>
      </div>
    </div>
  );
}
