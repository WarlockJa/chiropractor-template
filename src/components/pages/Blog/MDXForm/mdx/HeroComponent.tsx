"use client";

import { IParts_Hero } from "../mdxtypes";
import H1 from "./H1";
import P from "./P";
import CustomImageMDX from "../CustomImageMDX";
import { useAtomValue } from "jotai";
import { blogImagesAtom } from "../store/jotai";
import { useMemo } from "react";

export default function HeroComponent({
  title,
  description,
  imageId,
  // aria,
  // blurhash,
  // height,
  // name,
  // previewImage,
  // sizeBytes,
  // width,
}: IParts_Hero) {
  const blogImages = useAtomValue(blogImagesAtom);
  const image = useMemo(
    () => blogImages.find((item) => item.imageId === imageId),
    [imageId],
  );
  return (
    <div className="relative">
      <H1 className="font-outline absolute top-0 z-10 text-background drop-shadow-[2px_2px_1.5px_rgba(53,73,100,0.8)] dark:drop-shadow-[2px_2px_1.5px_rgba(208,204,219,0.8)]">
        {title}
      </H1>
      <CustomImageMDX
        image={image}
        // TODO check for vestiges
        className="max-h-[calc(100vh_-_var(--header-height))]"
      />
      <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent from-50% to-black to-100%"></div>
      <P className="font-outline absolute bottom-0 z-10 text-xl font-bold text-background drop-shadow-[1px_1px_0.5px_rgba(53,73,100,0.8)] dark:drop-shadow-[1px_1px_0.5px_rgba(208,204,219,0.8)]">
        {description}
      </P>
    </div>
  );
}
