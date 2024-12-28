import { useLayoutEffect, useState } from "react";
import { usePartWrapperContext } from "./wrappers/PartWrapper";
import ImagePrimitive from "./primitives/ImagePrimitive/ImagePrimitive";
import CarouselMDXPrimitive from "./primitives/CarouselMDXPrimitive";
import compareAsStrings from "@/lib/compareAsStrings";
import isOkToSaveAggregate from "./lib/isOkToSaveAggregate";
import { defaultBlurhash } from "@/appConfig";
import PartHeader from "./primitives/PartHeader";
import { IGenericImageProps, IParts_Gallery } from "../mdxtypes";

const DeafultSlide: IGenericImageProps = {
  imageId: null,
  name: "",
  aria: "",
  height: 0,
  sizeBytes: 0,
  width: 0,
  blurhash: defaultBlurhash,
};

interface IGalleryPartFormValues extends IFormValues {
  originalState: IParts_Gallery;
  currentValues: IParts_Gallery;
}

export default function GalleryPart({ blogId }: { blogId: number }) {
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: IGalleryPartFormValues;
    setFormValues: React.Dispatch<React.SetStateAction<IGalleryPartFormValues>>;
  };
  // active slide state
  const [activeSlide, setActiveSlide] = useState(0);

  useLayoutEffect(() => {
    // initialisation. populating empty array of gallery images with a first slide
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
  });

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <div>
      <PartHeader partName="Image Gallery Part" className="mb-4" />
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
    </div>
  );
}
