import {
  CarouselContent,
  Carousel,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useEffect, useState } from "react";
import { Circle, CircleDot, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomImageMDX from "../CustomImageMDX";
import ModalImagesViewer from "../../ModalImagesViewer";
import { TPartImageId } from "../mdxtypes";

export default function CarouselMDX({
  imageIds,
  autoScroll,
  autoScrollSpeed,
  fade,
  loop,
}: {
  imageIds: string;
  loop?: boolean;
  fade?: boolean;
  autoScroll?: boolean;
  autoScrollSpeed?: number;
}) {
  // carousel api
  const [api, setApi] = useState<CarouselApi>();
  // carousel hover state
  const [carouselHover, setCarouselHover] = useState(false);
  // slides data state
  const [data] = useState<TPartImageId[]>(() => JSON.parse(imageIds));
  // plugins array
  const [plugins] = useState(() => {
    const pluginsArray = [];
    if (fade) {
      pluginsArray.push(Fade());
    }
    if (autoScroll) {
      pluginsArray.push(
        Autoplay({
          delay: autoScrollSpeed ? autoScrollSpeed * 1000 : 4000,
        }),
      );
    }
    return pluginsArray;
  });
  // active slide state
  const [activeSlide, setActiveSlide] = useState(0);

  // tracking active slide change
  useEffect(() => {
    if (!api) return;
    setActiveSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api || !autoScroll) return;

    carouselHover
      ? api.plugins().autoplay.stop()
      : api.plugins().autoplay.play();
  }, [api, carouselHover, autoScroll]);

  return (
    <>
      <Carousel
        setApi={setApi}
        className="mx-auto w-full max-w-screen-md"
        opts={{ align: "start", loop }}
        plugins={plugins}
        onMouseOver={() => {
          setCarouselHover(true);
        }}
        onMouseLeave={() => setCarouselHover(false)}
      >
        <CarouselContent>
          {data.map((imageId, index) => (
            <CarouselItem key={`${imageId}${index}`}>
              <CustomImageMDX imageId={imageId} className="h-96 max-h-96" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious type="button" />
        <CarouselNext type="button" />
        <ModalImagesViewer
          imageIds={data}
          activeImageIndex={activeSlide}
          parentApi={api}
        >
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="absolute bottom-10 right-1"
            title="Fullscreen"
          >
            <Maximize />
          </Button>
        </ModalImagesViewer>
        <ul className="m-0 flex justify-center">
          {data.map((_, index) => (
            <Button
              type="button"
              key={`dot${index}`}
              size={"icon"}
              variant={"ghost"}
              className="z-50"
              onClick={() => api?.scrollTo(index)}
            >
              {activeSlide === index ? <CircleDot /> : <Circle />}
            </Button>
          ))}
        </ul>
      </Carousel>
    </>
  );
}
