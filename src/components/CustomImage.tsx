// CustomImage is a server component that fetches data from Images table
// when passed either imageId or name fields
// WARNING because this is a server component it needs to be nested as a children prop
// when used inside of the client components

import { defaultBlurhash } from "@/appConfig";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { getCachedImageId } from "@/lib/cache/getCachedImageId";
import { getCachedImageName } from "@/lib/cache/getCachedImageName";
import { env } from "@/lib/env.mjs";
import { cn } from "@/lib/utils";
import { SelectImages } from "@db/schemaImage";
import Image from "next/image";

export default async function CustomImage({
  imageId,
  dbImageName,
  className,
}: {
  imageId?: number;
  dbImageName?: string;
  className?: string;
}) {
  // development environment workaround to access images
  if (process.env.NODE_ENV === "development") {
    return (
      <Image
        src={`${env.NEXT_PUBLIC_R2_URI}/${dbImageName}`}
        alt={"development"}
        aria-label={"development"}
        placeholder="blur"
        blurDataURL={blurHashToDataURL(defaultBlurhash)}
        width={640}
        height={480}
        className={cn("h-full w-full object-cover", className)}
        sizes="100vw"
      />
    );
  }

  // fetching image data from the DB
  let image: SelectImages | undefined;
  if (imageId) {
    image = (await getCachedImageId(imageId))[0];
  } else if (dbImageName) {
    image = (await getCachedImageName(dbImageName))[0];
  }

  // displaying image
  return image ? (
    <Image
      src={`${env.NEXT_PUBLIC_R2_URI}/${image.name}`}
      // TODO add translation to alt and aria
      alt={image.aria}
      aria-label={image.aria}
      placeholder="blur"
      blurDataURL={blurHashToDataURL(image.blurhash ?? defaultBlurhash)}
      width={image.width}
      height={image.height}
      className={cn("h-full w-full object-cover", className)}
      sizes="100vw"
    />
  ) : (
    <Image
      src={`${env.NEXT_PUBLIC_R2_URI}/default.webp`}
      alt={"default image"}
      aria-label={"default image"}
      placeholder="blur"
      blurDataURL={defaultBlurhash}
      width={1024}
      height={1024}
      className={cn("h-full w-full object-cover", className)}
      sizes="100vw"
    />
  );
}
