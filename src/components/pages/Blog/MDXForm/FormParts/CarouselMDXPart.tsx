import React, { useLayoutEffect, useState } from "react";
import { usePartWrapperContext } from "./wrappers/PartWrapper";
import CarouselMDXPrimitive from "./primitives/CarouselMDXPrimitive";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import isOkToSaveAggregate from "./lib/isOkToSaveAggregate";
import compareAsStrings from "@/lib/compareAsStrings";
import ImagePrimitive from "./primitives/ImagePrimitive/ImagePrimitive";
import { defaultBlurhash } from "@/appConfig";
import PartHeader from "./primitives/PartHeader";
import { IGenericImageProps, IParts_CarouselMDX } from "../mdxtypes";

const DeafultSlide: IGenericImageProps = {
  imageId: null,
  name: "",
  aria: "",
  height: 0,
  sizeBytes: 0,
  width: 0,
  blurhash: defaultBlurhash,
};

interface ICarouselMDXPartFormValues extends IFormValues {
  originalState: IParts_CarouselMDX;
  currentValues: IParts_CarouselMDX;
}

export default function CarouselMDXPart({ blogId }: { blogId: number }) {
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
    if (formValues.currentValues.images.length === 0) {
      setFormValues({
        ...formValues,
        currentValues: { ...formValues.currentValues, images: [DeafultSlide] },
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
      <PartHeader partName="Image Carousel Part" className="mb-4" />
      {formValues.currentValues.images[activeSlide] && (
        <ImagePrimitive
          blogId={blogId}
          imgSrc={formValues.currentValues.images[activeSlide].name}
          setImgSrcAndAria={(data: { name: string; aria?: string }) => {
            // evaluating if it is ok to save the whole part
            // finding if a primitive has changed
            const newCurrentValuesImages = [
              ...formValues.currentValues.images.slice(0, activeSlide),
              { ...formValues.currentValues.images[activeSlide], ...data },
              ...formValues.currentValues.images.slice(activeSlide + 1),
            ];

            const image = !compareAsStrings(
              newCurrentValuesImages,
              formValues.originalState.images,
            );
            // saving change state for the primitive
            setIsOkToSavePart((prev) => ({ ...prev, image }));

            // comparing with the rest of the primitives
            const isOkToSave = isOkToSaveAggregate({
              aggregate: isOkToSavePart,
              current: { image },
              override: {
                value:
                  newCurrentValuesImages.findIndex((img) => !img.name) === -1,
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
          }}
        />
      )}
      <CarouselMDXPrimitive
        activeSlide={activeSlide}
        images={formValues.currentValues.images}
        setActiveSlide={setActiveSlide}
        addNewSlide={() => {
          setFormValues((prev) => ({
            ...prev,
            currentValues: {
              ...prev.currentValues,
              images: prev.currentValues.images
                .slice(0, activeSlide + 1)
                .concat(
                  DeafultSlide,
                  prev.currentValues.images.slice(activeSlide + 1),
                ),
            },
            isOkToSave: false,
          }));
        }}
        deleteCurrentSlide={() => {
          // evaluating if it is ok to save the whole part
          // finding if a primitive has changed
          const newCurrentValuesImages = [
            ...formValues.currentValues.images.slice(0, activeSlide),
            ...formValues.currentValues.images.slice(activeSlide + 1),
          ];

          const image = !compareAsStrings(
            newCurrentValuesImages,
            formValues.originalState.images,
          );
          // saving change state for the primitive
          setIsOkToSavePart((prev) => ({ ...prev, image }));
          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { image },
            override: {
              value:
                newCurrentValuesImages.findIndex((img) => !img.name) === -1,
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
          if (activeSlide === formValues.currentValues.images.length - 1) {
            setActiveSlide(activeSlide - 1);
          }
        }}
      />
      <Card className="shadow-md md:m-4">
        <CardHeader>
          <CardTitle className="text-xl">Carousel Preferences</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-around gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="carouselLoopFlag" className="text-lg">
              Loop
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
                      formValues.currentValues.images.findIndex(
                        (img) => !img.name,
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
              Fade
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
                      formValues.currentValues.images.findIndex(
                        (img) => !img.name,
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
              Auto Scroll
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
                      formValues.currentValues.images.findIndex(
                        (img) => !img.name,
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
              Auto Scroll Speed(s)
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
                      formValues.currentValues.images.findIndex(
                        (img) => !img.name,
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
