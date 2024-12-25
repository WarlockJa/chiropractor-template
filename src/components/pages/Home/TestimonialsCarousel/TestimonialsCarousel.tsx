"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ReactNode, useState } from "react";

export default function TestimonialsCarousel({
  carouselItems,
  delayMs = 4000,
  className,
}: {
  carouselItems: ReactNode[];
  delayMs?: number;
  className?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className={className}
      plugins={[Autoplay({ delay: delayMs, stopOnInteraction: true })]}
    >
      <CarouselContent className="mx-auto max-w-screen-xsm">
        {/* adding slides from both sides to imitate infinite loop */}
        {carouselItems.map((item, index) => (
          <CarouselItem className="mx-2 select-none pl-0" key={index}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute left-4 top-2/3 h-20 w-20 border-accent bg-transparent opacity-20 transition-all hover:opacity-80"
      />
      <CarouselNext
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute right-4 top-2/3 h-20 w-20 border-accent bg-transparent opacity-20 transition-all hover:opacity-80"
      />
    </Carousel>
  );
}
