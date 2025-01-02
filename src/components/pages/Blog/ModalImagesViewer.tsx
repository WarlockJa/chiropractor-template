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
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Circle, CircleDot, X } from "lucide-react";
// import Socials from "./Socials";
import ModalImageCloseUp from "./ModalImageCloseUp";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { controlActiveAtom } from "./MDXForm/store/jotai";
import CustomImageMDX from "./MDXForm/CustomImageMDX";
import { TPartImageId } from "./MDXForm/mdxtypes";
import useIsMobile from "@/hooks/useIsMobile";
import Socials from "./Socials";

// modal viewer for images
export default function ModalImagesViewer({
  imageIds,
  activeImageIndex,
  children,
  parentApi,
}: {
  imageIds: TPartImageId[];
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

  // verifying if viewed on the mobile device
  const isMobile = useIsMobile();

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
        <SheetTitle className="hidden">Images Modal</SheetTitle>
        <SheetDescription className="hidden">Images Modal</SheetDescription>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="max-h-screen bg-secondary"
        >
          <CarouselContent className="m-0">
            {imageIds.map((imageId, index) => (
              <CarouselItem
                key={`${imageId}${index}`}
                className="h-screen w-screen pl-0"
              >
                {closeUp.open &&
                  activeSlide === index &&
                  imageId &&
                  !isMobile && (
                    <ModalImageCloseUp
                      clickX={closeUp.clickX}
                      clickY={closeUp.clickY}
                      imageId={imageId}
                      activeSlide={activeSlide}
                    />
                  )}

                <CustomImageMDX imageId={imageId} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              api?.scrollPrev();
            }}
            variant={"ghost"}
            className={cn(
              "fixed inset-y-0 left-0 hidden h-full p-0 text-secondary-foreground md:block",
              (closeUp.open || imageIds.length === 1) && "md:hidden",
            )}
          >
            <ChevronLeft size={96} />
          </Button>
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              api?.scrollNext();
            }}
            variant={"ghost"}
            className={cn(
              "fixed inset-y-0 right-0 hidden h-full p-0 text-secondary-foreground md:block",
              (closeUp.open || imageIds.length === 1) && "md:hidden",
            )}
          >
            <ChevronRight size={96} />
          </Button>
          <ul className="absolute bottom-0 left-0 right-0 flex justify-center">
            {imageIds.length > 1 &&
              imageIds.map((_, index) => (
                <Button
                  type="button"
                  variant={"ghost"}
                  key={`dot${index}`}
                  size={"icon"}
                  onFocus={(e) => e.currentTarget.blur()}
                  onClick={() => {
                    api?.scrollTo(index);
                    parentApi?.scrollTo(index);
                  }}
                  className={cn(
                    "text-secondary-foreground",
                    closeUp.open && "hidden",
                  )}
                  onMouseOver={() => setControlActive(true)}
                  onMouseLeave={() => setControlActive(false)}
                >
                  {activeSlide === index ? <CircleDot /> : <Circle />}
                </Button>
              ))}
          </ul>
        </Carousel>
        <SheetHeader className="absolute bottom-7 left-2">
          <Socials
            url={`/image/${activeSlide}`}
            className="flex w-24 gap-1.5 rounded-sm"
          />
        </SheetHeader>
        <SheetClose
          onClick={(e) => {
            e.stopPropagation();
            setCloseUp((prev) => ({ ...prev, open: false }));
          }}
          asChild
        >
          <Button
            type="button"
            className="absolute bottom-7 right-2 flex w-24 items-center rounded-sm px-1.5 text-xl transition-colors hover:bg-background hover:text-accent hover:underline"
          >
            <X size={24} />
            Close
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
