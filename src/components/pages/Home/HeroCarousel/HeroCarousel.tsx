"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode, useState } from "react";

export default function HeroCarousel({
  slide1,
  slide2,
  slide3,
}: {
  slide1: ReactNode;
  slide2: ReactNode;
  slide3: ReactNode;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Carousel
      opts={{
        loop: true,
        duration: 20,
      }}
      plugins={[
        Autoplay({
          delay: 7000,
          active: !hover,
        }),
      ]}
    >
      <CarouselContent className="h-screen md:h-[40em] xl:h-[62em]">
        <CarouselItem>{slide1}</CarouselItem>
        <CarouselItem>{slide2}</CarouselItem>
        <CarouselItem>{slide3}</CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute left-4 top-1/2 hidden h-20 w-20 border-accent bg-transparent text-foreground opacity-20 transition-all hover:bg-background/30 hover:opacity-80 lg:flex"
      />
      <CarouselNext
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute right-4 top-1/2 hidden h-20 w-20 border-accent bg-transparent text-foreground opacity-20 transition-all hover:bg-background/30 hover:opacity-80 lg:flex"
      />
    </Carousel>
  );
}
