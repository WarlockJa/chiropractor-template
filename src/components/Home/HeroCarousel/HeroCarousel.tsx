"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode, useEffect, useState } from "react";

export default function HeroCarousel({
  slide1,
  slide2,
  slide3,
}: {
  slide1: ReactNode;
  slide2: ReactNode;
  slide3: ReactNode;
}) {
  // const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);
  const [hover, setHover] = useState(false);

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      // setApi={setApi}
      plugins={[
        Autoplay({
          delay: 7000,
          active: !hover,
        }),
      ]}
    >
      <CarouselContent className="h-screen">
        <CarouselItem>{slide1}</CarouselItem>
        <CarouselItem>{slide2}</CarouselItem>
        <CarouselItem>{slide3}</CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute left-4 top-1/2 h-20 w-20 bg-transparent opacity-20 transition-all hover:bg-background/30 hover:opacity-80"
      />
      <CarouselNext
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute right-4 top-1/2 h-20 w-20 bg-transparent opacity-20 transition-all hover:bg-background/30 hover:opacity-80"
      />
    </Carousel>
  );
}
