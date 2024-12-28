"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Circle, CircleDot, X } from "lucide-react";
// import Socials from "./Socials";
import ModalImageCloseUp from "./ModalImageCloseUp";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { IGenericImageProps } from "./MDXForm/mdxtypes";
import { controlActiveAtom } from "./MDXForm/store/jotai";
import CustomImageMDX from "./MDXForm/CustomImageMDX";

// modal viewer for images
export default function ModalImagesViewer({
  images,
  activeImageIndex,
  children,
  parentApi,
}: {
  images: IGenericImageProps[];
  children: ReactNode;
  activeImageIndex?: number;
  parentApi?: CarouselApi;
}) {
  // carousel api
  const [api, setApi] = useState<CarouselApi>();
  // active slide state
  const [activeSlide, setActiveSlide] = useState(activeImageIndex ?? 0);
  // image close up state with initial cooridinates
  const [closeUp, setCloseUp] = useState({ open: false, clickX: 0, clickY: 0 });
  // controls hover state
  const [controlActive, setControlActive] = useAtom(controlActiveAtom);

  // tracking active slide change
  useEffect(() => {
    if (!api) return;
    if (activeImageIndex) api.scrollTo(activeImageIndex, true);

    setActiveSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // carousel keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!api) return;
    switch (e.code) {
      case "Escape":
        setCloseUp((prev) => ({ ...prev, open: false }));
        break;
      case "ArrowRight":
        setCloseUp((prev) => ({ ...prev, open: false }));
        api.scrollNext();
        break;
      case "ArrowLeft":
        setCloseUp((prev) => ({ ...prev, open: false }));
        api.scrollPrev();
        break;

      default:
        break;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={"top"}
        className={cn(
          "max-h-screen p-0",
          closeUp.open ? "cursor-zoom-out" : "cursor-zoom-in",
        )}
        onKeyDown={handleKeyDown}
        onClick={(e) => {
          controlActive
            ? setCloseUp({
                open: false,
                clickX: e.clientX,
                clickY: e.clientY,
              })
            : setCloseUp({
                open: !closeUp.open,
                clickX: e.clientX,
                clickY: e.clientY,
              });
        }}
      >
        {/* TODO check Socials */}
        {/* <SheetHeader className="absolute bottom-8 left-4 z-10">
          <SheetTitle></SheetTitle>
          <SheetDescription>
            {images[activeSlide].id && (
              <Socials
                url={`/image/${images[activeSlide].id}`}
                instagram={images[activeSlide].instagram}
                title={images[activeSlide].alt}
              />
            )}
          </SheetDescription>
        </SheetHeader> */}
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="max-h-screen bg-secondary"
        >
          <CarouselContent className="m-0">
            {images.map((img, index) => (
              <CarouselItem
                key={`${img.imageId}${index}`}
                className="h-screen w-screen"
              >
                {closeUp.open && activeSlide === index && (
                  <ModalImageCloseUp
                    clickX={closeUp.clickX}
                    clickY={closeUp.clickY}
                    imageSrc={img.name}
                    activeSlide={activeSlide}
                  />
                )}

                <CustomImageMDX image={img} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious type="button" />
          <CarouselNext type="button" />
          <ul className="absolute bottom-0 left-0 right-0 flex justify-center">
            {images.length > 1 &&
              images.map((_, index) => (
                <Button
                  type="button"
                  key={`dot${index}`}
                  size={"icon"}
                  variant={"ghost"}
                  onFocus={(e) => e.currentTarget.blur()}
                  onClick={() => {
                    api?.scrollTo(index);
                    parentApi?.scrollTo(index);
                  }}
                  onMouseOver={() => setControlActive(true)}
                  onMouseLeave={() => setControlActive(false)}
                >
                  {activeSlide === index ? <CircleDot /> : <Circle />}
                </Button>
              ))}
          </ul>
        </Carousel>
        <SheetClose
          onClick={(e) => {
            e.stopPropagation();
            setCloseUp((prev) => ({ ...prev, open: false }));
          }}
        >
          <div className="absolute bottom-7 right-2 flex items-center rounded-sm px-1.5 text-xl transition-colors hover:bg-background hover:text-accent hover:underline">
            <X size={24} />
            Close
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
