import { ReactNode } from "react";
import CustomImage from "./CustomImage";

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
    <div className={className}>
      <div className="absolute inset-0 z-10 bg-foreground/10"></div>
      <CustomImage imageId={imageId} dbImageName={dbImageName} />
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
