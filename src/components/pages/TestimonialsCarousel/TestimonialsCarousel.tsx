"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ReactNode } from "react";

export default function TestimonialsCarousel({
  carouselItems,
  delayMs = 4000,
  className,
}: {
  carouselItems: ReactNode[];
  delayMs?: number;
  className?: string;
}) {
  return (
    <Carousel
      opts={{
        loop: true,
        duration: 15,
      }}
      className={className}
      plugins={[
        Autoplay({
          delay: delayMs,
        }),
      ]}
    >
      <CarouselContent className="mx-auto max-w-screen-lg">
        {/* adding slides from both sides to imitate infinite loop */}
        {carouselItems.map((item, index) => (
          <CarouselItem className="mx-2 select-none pl-0" key={index}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-2/3 h-20 w-20 border-accent bg-transparent opacity-20 transition-all hover:opacity-80" />
      <CarouselNext className="absolute right-2 top-2/3 h-20 w-20 border-accent bg-transparent opacity-20 transition-all hover:opacity-80" />
    </Carousel>
  );
}
