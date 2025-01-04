import React, { useLayoutEffect, useState } from "react";
import { usePartWrapperContext } from "./wrappers/PartWrapper";
import CarouselMDXPrimitive from "./primitives/CarouselMDXPrimitive";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import isOkToSaveAggregate from "./lib/isOkToSaveAggregate";
import compareAsStrings from "@/lib/compareAsStrings";
import ImagePrimitive from "./primitives/ImagePrimitive/ImagePrimitive";
import PartHeader from "./primitives/PartHeader";
import { IGenericImageProps, IParts_CarouselMDX } from "../mdxtypes";
import { SelectBlogs } from "@db/schemaBlog";
import { useTranslations } from "next-intl";

interface ICarouselMDXPartFormValues extends IFormValues {
  originalState: IParts_CarouselMDX;
  currentValues: IParts_CarouselMDX;
}

export default function CarouselMDXPart({
  blogId,
}: Pick<SelectBlogs, "blogId">) {
  const tBlogCarousel = useTranslations("Blog.CarouselPart");
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: ICarouselMDXPartFormValues;
    setFormValues: React.Dispatch<
      React.SetStateAction<ICarouselMDXPartFormValues>
    >;
  };
  // active slide state
  const [activeSlide, setActiveSlide] = useState(0);

  useLayoutEffect(() => {
    // initialisation. populating empty array of carousel images with a first slide
    if (formValues.currentValues.imageIds.length === 0) {
      setFormValues({
        ...formValues,
        currentValues: { ...formValues.currentValues, imageIds: [null] },
      });
    }
  }, []);

  // primitive isOkToSave aggregate
  const [isOkToSavePart, setIsOkToSavePart] = useState({
    image: false,
    preferencesLoop: false,
    preferencesFade: false,
    preferencesAutoScroll: false,
    preferencesAutoScrollSpeed: false,
  });

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <div>
      {/* TODO add translations */}
      <PartHeader partName={tBlogCarousel("part_name")} className="mb-4" />
      <ImagePrimitive
        blogId={blogId}
        imageId={formValues.currentValues.imageIds[activeSlide]}
        setImageId={({ imageId }: Pick<IGenericImageProps, "imageId">) => {
          // evaluating if it is ok to save the whole part
          // finding if a primitive has changed
          const newCurrentValuesImages = [
            ...formValues.currentValues.imageIds.slice(0, activeSlide),
            imageId,
            ...formValues.currentValues.imageIds.slice(activeSlide + 1),
          ];

          const image = !compareAsStrings(
            newCurrentValuesImages,
            formValues.originalState.imageIds,
          );
          // saving change state for the primitive
          setIsOkToSavePart((prev) => ({ ...prev, image }));

          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { image },
            override: {
              value:
                newCurrentValuesImages.findIndex((imageId) => !imageId) === -1,
            },
          });

          setFormValues((prev) => ({
            ...prev,
            currentValues: {
              ...prev.currentValues,
              imageIds: newCurrentValuesImages,
            },
            isOkToSave,
          }));
        }}
      />
      <CarouselMDXPrimitive
        activeSlide={activeSlide}
        imageIds={formValues.currentValues.imageIds}
        setActiveSlide={setActiveSlide}
        addNewSlide={() => {
          setFormValues((prev) => ({
            ...prev,
            currentValues: {
              ...prev.currentValues,
              imageIds: prev.currentValues.imageIds
                .slice(0, activeSlide + 1)
                .concat(
                  null,
                  prev.currentValues.imageIds.slice(activeSlide + 1),
                ),
            },
            isOkToSave: false,
          }));
        }}
        deleteCurrentSlide={() => {
          // evaluating if it is ok to save the whole part
          // finding if a primitive has changed
          const newCurrentValuesImages = [
            ...formValues.currentValues.imageIds.slice(0, activeSlide),
            ...formValues.currentValues.imageIds.slice(activeSlide + 1),
          ];

          const image = !compareAsStrings(
            newCurrentValuesImages,
            formValues.originalState.imageIds,
          );
          // saving change state for the primitive
          setIsOkToSavePart((prev) => ({ ...prev, image }));
          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { image },
            override: {
              value:
                newCurrentValuesImages.findIndex((imageId) => !imageId) === -1,
            },
          });

          setFormValues((prev) => ({
            ...prev,
            currentValues: {
              ...prev.currentValues,
              images: newCurrentValuesImages,
            },
            isOkToSave,
          }));
          // when deleting slides Carousel component does not trigger "select" event
          // because of that when deleting the last slide adjusting new activeSlide manually
          if (activeSlide === formValues.currentValues.imageIds.length - 1) {
            setActiveSlide(activeSlide - 1);
          }
        }}
      />
      <Card className="shadow-md md:m-4">
        <CardHeader>
          <CardTitle className="text-xl">
            {tBlogCarousel("preferences")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-around gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="carouselLoopFlag" className="text-lg">
              {tBlogCarousel("loop")}
            </Label>
            <Input
              id="carouselLoopFlag"
              type="checkbox"
              className="h-8 w-8"
              checked={formValues.currentValues.loop ?? false}
              onChange={(e) => {
                // evaluating if it is ok to save the whole part
                // finding if a primitive has changed
                const preferencesLoop =
                  e.target.checked !== Boolean(formValues.originalState.loop);
                // saving change state for the primitive
                setIsOkToSavePart((prev) => ({ ...prev, preferencesLoop }));

                // comparing with the rest of the primitives
                const isOkToSave = isOkToSaveAggregate({
                  aggregate: isOkToSavePart,
                  current: { preferencesLoop },
                  override: {
                    value:
                      formValues.currentValues.imageIds.findIndex(
                        (imageId) => !imageId,
                      ) === -1,
                  },
                });

                setFormValues((prev) => ({
                  ...prev,
                  currentValues: {
                    ...prev.currentValues,
                    loop: e.target.checked,
                  },
                  isOkToSave,
                }));
              }}
            ></Input>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="carouselFadeFlag" className="text-lg">
              {tBlogCarousel("fade")}
            </Label>
            <Input
              id="carouselFadeFlag"
              type="checkbox"
              className="h-8 w-8"
              checked={formValues.currentValues.fade ?? false}
              onChange={(e) => {
                // evaluating if it is ok to save the whole part
                // finding if a primitive has changed
                const preferencesFade =
                  e.target.checked !== Boolean(formValues.originalState.fade);
                // saving change state for the primitive
                setIsOkToSavePart((prev) => ({ ...prev, preferencesFade }));

                // comparing with the rest of the primitives
                const isOkToSave = isOkToSaveAggregate({
                  aggregate: isOkToSavePart,
                  current: { preferencesFade },
                  override: {
                    value:
                      formValues.currentValues.imageIds.findIndex(
                        (imageId) => !imageId,
                      ) === -1,
                  },
                });

                setFormValues((prev) => ({
                  ...prev,
                  currentValues: {
                    ...prev.currentValues,
                    fade: e.target.checked,
                  },
                  isOkToSave,
                }));
              }}
            ></Input>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="carouselAutoScrollFlag" className="text-lg">
              {tBlogCarousel("auto_scroll")}
            </Label>
            <Input
              id="carouselAutoScrollFlag"
              type="checkbox"
              className="h-8 w-8"
              checked={formValues.currentValues.autoScroll ?? false}
              onChange={(e) => {
                // evaluating if it is ok to save the whole part
                // finding if a primitive has changed
                const preferencesAutoScroll =
                  e.target.checked !==
                  Boolean(formValues.originalState.autoScroll);
                // saving change state for the primitive
                setIsOkToSavePart((prev) => ({
                  ...prev,
                  preferencesAutoScroll,
                }));

                // comparing with the rest of the primitives
                const isOkToSave = isOkToSaveAggregate({
                  aggregate: e.target.checked
                    ? isOkToSavePart
                    : { ...isOkToSavePart, preferencesAutoScrollSpeed: false },
                  current: { preferencesAutoScroll },
                  override: {
                    value:
                      formValues.currentValues.imageIds.findIndex(
                        (imageId) => !imageId,
                      ) === -1,
                  },
                });

                setFormValues((prev) => ({
                  ...prev,
                  currentValues: {
                    ...prev.currentValues,
                    autoScroll: e.target.checked,
                  },
                  isOkToSave,
                }));
              }}
            ></Input>
          </div>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="carouselAutoScrollSpeed"
              className="text-lg"
              style={
                !formValues.currentValues.autoScroll
                  ? { color: "hsl(var(--muted-foreground))" }
                  : undefined
              }
            >
              {tBlogCarousel("auto_scroll_speed")}
            </Label>
            <Input
              id="carouselAutoScrollSpeed"
              type="number"
              className="w-20"
              disabled={!formValues.currentValues.autoScroll}
              value={formValues.currentValues.autoScrollSpeed ?? 4}
              min={1}
              onChange={(e) => {
                // evaluating if it is ok to save the whole part
                // finding if a primitive has changed
                const preferencesAutoScrollSpeed =
                  Number(e.target.value) !==
                  formValues.originalState.autoScrollSpeed;
                // saving change state for the primitive
                setIsOkToSavePart((prev) => ({
                  ...prev,
                  preferencesAutoScrollSpeed,
                }));

                // comparing with the rest of the primitives
                const isOkToSave = isOkToSaveAggregate({
                  aggregate: isOkToSavePart,
                  current: { preferencesAutoScrollSpeed },
                  override: {
                    value:
                      formValues.currentValues.imageIds.findIndex(
                        (imageId) => !imageId,
                      ) === -1,
                  },
                });

                setFormValues((prev) => ({
                  ...prev,
                  currentValues: {
                    ...prev.currentValues,
                    autoScrollSpeed: Number(e.target.value),
                  },
                  isOkToSave,
                }));
              }}
            ></Input>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
