"use client";

import Image from "next/image";
import { env } from "@/lib/env.mjs";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { defaultBlurhash, defaultImageName } from "@/appConfig";
import { cn } from "@/lib/utils";
import { TPartImageId } from "./mdxtypes";
import { useAtomValue } from "jotai";
import { blogImagesAtom } from "./store/jotai";
import { useMemo } from "react";

export default function CustomImageMDX({
  imageId,
  className,
}: {
  imageId: TPartImageId;
  className?: string;
}) {
  // blog images data
  const images = useAtomValue(blogImagesAtom);

  const image = useMemo(
    () => images.find((img) => img.imageId === imageId),
    [imageId, images],
  );

  return image && process.env.NODE_ENV !== "development" ? (
    <Image
      src={`${env.NEXT_PUBLIC_R2_URI}/${image.name}`}
      // TODO add translation to alt and aria
      alt={image.aria}
      aria-label={image.aria}
      placeholder="blur"
      blurDataURL={blurHashToDataURL(image.blurhash ?? defaultBlurhash)}
      width={image.width}
      height={image.height}
      // className={cn("h-full w-full object-contain", className)}
      className={cn("h-full w-full object-scale-down", className)}
      // className={cn("h-full w-full object-cover", className)}
      sizes="100vw"
    />
  ) : (
    <Image
      src={`${env.NEXT_PUBLIC_R2_URI}/${defaultImageName}`}
      alt={"default image"}
      aria-label={"default image"}
      placeholder="blur"
      blurDataURL={defaultBlurhash}
      width={2048}
      height={1365}
      // className={cn("h-full w-full object-contain", className)}
      className={cn("h-full w-full object-scale-down", className)}
      // className={cn("h-full w-full object-cover", className)}
      // className={cn("h-full border-8 border-red-400 object-contain", className)}
      sizes="100vw"
    />
  );
}
