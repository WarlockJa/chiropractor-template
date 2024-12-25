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
  InstagramIcon,
} from "next-share";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { env } from "@/lib/env.mjs";

export default function Socials({
  url,
  title,
  instagram,
  spread,
}: {
  url: string; // example: "/image/<ImageId>" | "/blog/<BlogId>"
  title: string;
  instagram?: string; // link to instagram post. A workaround because Instagram does not allow web share
  spread?: boolean;
}) {
  return spread ? (
    <div className="my-2 flex items-center gap-4 rounded border-2 px-4 py-2 transition-colors hover:border-accent">
      <div className="flex items-center text-xl">
        <Share2 size={24} />
        &nbsp;Share:
      </div>{" "}
      <SMButtons url={url} instagram={instagram} title={title} />
    </div>
  ) : (
    <Popover>
      <PopoverTrigger
        title="Share!"
        className="flex items-center gap-2 text-lg transition-colors hover:text-accent hover:underline"
      >
        <Share2 size={20} /> Share
      </PopoverTrigger>
      <PopoverContent className="flex w-fit gap-4">
        <SMButtons url={url} instagram={instagram} title={title} />
      </PopoverContent>
    </Popover>
  );
}

const SMButtons = ({
  url,
  instagram,
  title,
}: {
  url: string;
  instagram?: string;
  title: string;
}) => {
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
        >
          <TelegramIcon
            size={48}
            className="transition-opacity hover:opacity-70"
          />
        </TelegramShareButton>
      </div>
      {instagram && (
        <Button
          title="Share on Instagram!"
          variant={"ghost"}
          className="h-12 w-12 transition-opacity hover:opacity-70"
          type="button"
          size={"icon"}
          asChild
        >
          <Link href={instagram} target="_blank">
            <InstagramIcon size={48} />
          </Link>
        </Button>
      )}
    </>
  );
};
