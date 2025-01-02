"use client";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";
import { Share2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { env } from "@/lib/env.mjs";
import { brandName } from "@/appConfig";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Socials({
  url,
  className,
  spread,
}: {
  url: string;
  className?: string;
  spread?: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (!url) return null;

  return spread ? (
    <div className="my-2 flex items-center gap-4 rounded border-2 px-4 py-2 transition-colors hover:border-accent">
      <div className="flex items-center text-xl">
        <Share2 size={24} />
        &nbsp;Share:
      </div>{" "}
      <SMButtons url={url} title={brandName} />
    </div>
  ) : (
    <Popover open={open}>
      <PopoverTrigger title="Share!" className={className} asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="px-1.5 text-xl transition-colors hover:bg-background hover:text-accent hover:underline"
        >
          <Share2 size={32} /> Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="pointer-events-auto flex w-fit gap-4">
        <SMButtons url={url} title={brandName} />
      </PopoverContent>
    </Popover>
  );
}

const SMButtons = ({ url, title }: { url: string; title: string }) => {
  return (
    <>
      <div title="Share on Twitter!" className="leading-[0]">
        <TwitterShareButton
          url={
            process.env.NODE_ENV === "production"
              ? `${env.NEXT_PUBLIC_URI}${url}`
              : `${env.NEXT_PUBLIC_URI}/image/33`
          }
          title={title}
        >
          <TwitterIcon
            size={48}
            className="transition-opacity hover:opacity-70"
          />
        </TwitterShareButton>
      </div>

      <div title="Share on Facebook!" className="leading-[0]">
        <FacebookShareButton
          url={
            process.env.NODE_ENV === "production"
              ? `${env.NEXT_PUBLIC_URI}${url}`
              : `${env.NEXT_PUBLIC_URI}/image/33`
          }
          quote={title}
        >
          <FacebookIcon
            size={48}
            className="transition-opacity hover:opacity-70"
          />
        </FacebookShareButton>
      </div>
      <div title="Share on WhatsApp!" className="leading-[0]">
        <WhatsappShareButton
          url={
            process.env.NODE_ENV === "production"
              ? `${env.NEXT_PUBLIC_URI}${url}`
              : `${env.NEXT_PUBLIC_URI}/image/33`
          }
          title={title}
        >
          <WhatsappIcon
            size={48}
            className="transition-opacity hover:opacity-70"
          />
        </WhatsappShareButton>
      </div>

      <div title="Share on Telegram!" className="leading-[0]">
        <TelegramShareButton
          url={
            process.env.NODE_ENV === "production"
              ? `${env.NEXT_PUBLIC_URI}${url}`
              : `${env.NEXT_PUBLIC_URI}/image/33`
          }
          title={title}
          onClick={(e) => e.stopPropagation()}
        >
          <TelegramIcon
            size={48}
            className="transition-opacity hover:opacity-70"
          />
        </TelegramShareButton>
      </div>
    </>
  );
};
