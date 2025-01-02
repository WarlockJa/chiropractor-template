"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ReactNode, useEffect, useState } from "react";

export default function ServicesCarousel({
  carouselItems,
  delayMs = 4000,
  className,
}: {
  carouselItems: ReactNode[];
  delayMs?: number;
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;

    if (current === carouselItems.length + 3) {
      api.scrollTo(2, true);
    }

    if (current === 2) {
      api.scrollTo(carouselItems.length + 1, true);
    }
  }, [current]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: true,
        startIndex: 2,
        duration: 15,
      }}
      className={className}
      plugins={[
        Autoplay({
          delay: () =>
            Array(carouselItems.length + 4)
              .fill(0)
              .map((_, index) =>
                index < 2 || index === carouselItems.length + 3 ? 0 : delayMs,
              ),
        }),
      ]}
    >
      <CarouselContent className="mx-auto max-w-screen-xsm">
        {/* adding slides from both sides to imitate infinite loop */}
        {carouselItems
          .slice(carouselItems.length - 2)
          .concat(carouselItems)
          .concat(carouselItems.slice(0, 3))
          .map((item, index) => (
            <CarouselItem className="mx-2 select-none pl-0" key={index}>
              {item}
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
