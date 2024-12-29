import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Circle, CircleDot, Plus, Trash2 } from "lucide-react";
import { TPartImageId } from "../../mdxtypes";
import CustomImageMDX from "../../CustomImageMDX";

interface ICarouselMDXPrimitiveProps {
  imageIds: TPartImageId[];
  addNewSlide: () => void;
  activeSlide: number;
  setActiveSlide: (newActiveSlide: number) => void;
  deleteCurrentSlide: () => void;
}

export default function CarouselMDXPrimitive({
  activeSlide,
  imageIds,
  setActiveSlide,
  addNewSlide,
  deleteCurrentSlide,
}: ICarouselMDXPrimitiveProps) {
  // carousel api
  const [api, setApi] = useState<CarouselApi>();

  // local slides count state
  const [slidesCount, setSlidesCount] = useState<{
    currentSlidesNumber: number;
    previousSlidesNumber: number;
  }>({
    currentSlidesNumber: imageIds.length,
    previousSlidesNumber: imageIds.length,
  });

  // slide number detection
  useEffect(() => {
    if (!api) {
      return;
    }

    setActiveSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // both useEffects used to accomodate switch to the new slide when added
  useEffect(() => {
    setSlidesCount({
      previousSlidesNumber: slidesCount.currentSlidesNumber,
      currentSlidesNumber: imageIds.length,
    });
  }, [imageIds.length]);
  // the second useEffect controls if switch to the last slide is needed
  useEffect(() => {
    if (!api) return;
    if (slidesCount.currentSlidesNumber > slidesCount.previousSlidesNumber) {
      api.scrollTo(activeSlide + 1);
    }
  }, [slidesCount, api]);

  return (
    <div className="my-4 flex flex-col border-2 md:flex-row">
      <Carousel setApi={setApi} className="mx-auto w-full max-w-screen-md">
        <CarouselContent>
          {imageIds.map((imageId, index) => (
            <CarouselItem key={`${imageId}${index}`}>
              <CustomImageMDX imageId={imageId} className="h-96 max-h-96" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious type="button" />
        <CarouselNext type="button" />
        <ul className="flex justify-center">
          {imageIds.map((_, index) => (
            <Button
              type="button"
              key={`dot${index}`}
              size={"icon"}
              variant={"ghost"}
              onClick={() => api?.scrollTo(index)}
            >
              {activeSlide === index ? <CircleDot /> : <Circle />}
            </Button>
          ))}
        </ul>
      </Carousel>
      <div className="flex justify-around md:flex-col-reverse">
        <Button
          type="button"
          variant={"outline"}
          title="Delete Slide"
          className="h-full w-full p-0 hover:text-destructive md:w-12"
          onClick={deleteCurrentSlide}
          disabled={imageIds.length < 2}
        >
          <Trash2 size={32} />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          title="Add New Slide"
          className="h-full w-full p-0 md:w-12"
          onClick={addNewSlide}
        >
          <Plus size={32} />
        </Button>
      </div>
    </div>
  );
}
