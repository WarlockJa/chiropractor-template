import { cn } from "@/lib/utils";
import { ArrowBigRight } from "lucide-react";
import HeaderImage from "../../UniversalComponents/HeaderImage";
import Link from "next/link";

export default function ServiceCard({
  title,
  className,
  href,
  imageId,
  dbImageName,
}: {
  title: string;
  className?: string;
  href: string;
  imageId?: number;
  dbImageName?: string;
}) {
  return (
    <HeaderImage
      className={cn(
        "group relative cursor-pointer overflow-hidden shadow-lg",
        className,
      )}
      imageId={imageId}
      dbImageName={dbImageName}
    >
      <Link href={href}>
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-background group-hover:to-primary md:from-55%">
          <div className="mt-auto flex h-full items-end text-2xl font-semibold text-foreground transition-colors group-hover:text-primary-foreground">
            <div className="flex w-full items-center justify-between pl-2 pr-0 lg:pl-8 lg:text-xl">
              {title}
              <div className="h-14 w-14 bg-primary">
                <ArrowBigRight className="h-14 w-14 stroke-1 text-primary-foreground group-hover:text-accent" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </HeaderImage>
  );
}
