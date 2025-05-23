"use client";

import { IParts_Hero } from "../mdxtypes";
import H1 from "./H1";
import P from "./P";
import CustomImageMDX from "../CustomImageMDX";

export default function HeroComponent({
  title,
  description,
  imageId,
}: IParts_Hero) {
  return (
    <div className="relative w-screen max-w-screen-lg">
      <H1 className="font-outline absolute bottom-1 z-10 text-slate-200 drop-shadow-[2px_2px_1.5px_rgba(53,73,100,0.8)] dark:drop-shadow-[2px_2px_1.5px_rgba(208,204,219,0.8)]">
        {/* <H1 className="font-outline absolute z-10 text-background drop-shadow-[2px_2px_1.5px_rgba(53,73,100,0.8)] dark:drop-shadow-[2px_2px_1.5px_rgba(208,204,219,0.8)]"> */}
        {title}
      </H1>
      <CustomImageMDX
        imageId={imageId}
        className="z-0 mt-0 h-[50vh] min-h-[20em] object-cover"
      />
      {/* <div className="absolute bottom-1/2 h-1/2 w-full bg-gradient-to-t from-transparent from-50% to-black to-100%"></div> */}
      <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent from-50% to-black to-100%"></div>
      {/* <p className="font-outline absolute bottom-0 z-10 text-xl font-bold text-background drop-shadow-[1px_1px_0.5px_rgba(53,73,100,0.8)] dark:drop-shadow-[1px_1px_0.5px_rgba(208,204,219,0.8)]">
        {description}
      </p> */}
      {/* <P className="font-outline absolute bottom-0 z-10 text-xl font-bold text-background drop-shadow-[1px_1px_0.5px_rgba(53,73,100,0.8)] dark:drop-shadow-[1px_1px_0.5px_rgba(208,204,219,0.8)]">
        {description}
      </P> */}
    </div>
  );
}
