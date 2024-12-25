"use client";
import React from "react";
import {
  brandFB,
  brandIG,
  brandPhone,
  brandWhatsApp,
  brandX,
  brandYT,
} from "@/appConfig";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import YoutubeIcon from "@/components/Icons/YoutubeIcon";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import WhatsAppIcon from "@/components/Icons/WhatsAppIcon";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useScrolled from "../hooks/useScrolled";
import { cn } from "@/lib/utils";

export default function ContactsPanel({ className }: { className?: string }) {
  const t = useTranslations("ContactsPanel");
  const isScrolled = useScrolled();
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-2",
        isScrolled && "opacity-0 md:opacity-100",
        className,
      )}
    >
      <Link
        className="transition-opacity hover:opacity-80"
        target="_blank"
        href={`tel:${brandPhone.number}`}
      >
        <div className="font-roboto text-nowrap text-4xl font-thin">
          {brandPhone.string}
        </div>
      </Link>
      {/* socials */}
      <div className="flex justify-end gap-4">
        <Link target="_blank" href={`https://wa.me/${brandWhatsApp.number}`}>
          <WhatsAppIcon className="h-8 w-8 fill-accent transition-all hover:fill-green-600 hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
        </Link>
        <Link target="_blank" href={brandFB}>
          <FacebookIcon className="h-8 w-8 fill-accent transition-all hover:fill-blue-600 hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
        </Link>
        <Link target="_blank" href={brandYT}>
          <YoutubeIcon className="h-8 w-8 fill-accent transition-all hover:fill-red-600 hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
        </Link>
        <Link target="_blank" href={brandX}>
          <TwitterIcon className="h-8 w-8 fill-accent transition-all hover:fill-black hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
        </Link>
        <Link target="_blank" href={brandIG}>
          <InstagramIcon className="h-8 w-8 fill-accent transition-all hover:fill-red-400 hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]" />
        </Link>
      </div>
      {/* mail */}
      {/* <Link
        className="flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
        target="_blank"
        href={`mailto:${brandEmail}`}
      >
        <Mail size={20} />{" "}
        <div className="hidden tracking-wider md:block">{brandEmail}</div>
      </Link> */}

      {/* contacts */}
      {/* <div className="flex gap-4">
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
      </div> */}

      {/* <div className="flex gap-2">
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
      </div> */}
    </div>
  );
}
