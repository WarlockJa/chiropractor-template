import { ReactNode } from "react";
import CustomImage from "./CustomImage";
import { cn } from "@/lib/utils";

export default function HeaderImage({
  children,
  className,
  imageId,
  dbImageName,
}: {
  children: ReactNode;
  className?: string;
  imageId?: number;
  dbImageName?: string;
}) {
  return (
    <div
      className={cn(
        "font-bold text-background dark:text-primary-foreground",
        className,
      )}
    >
      <div className="absolute inset-0 z-10 bg-foreground/10 dark:bg-background/70"></div>
      <CustomImage imageId={imageId} dbImageName={dbImageName} />
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
