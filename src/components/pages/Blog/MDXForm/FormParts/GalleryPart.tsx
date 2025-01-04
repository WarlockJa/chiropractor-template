import { useLayoutEffect, useState } from "react";
import { usePartWrapperContext } from "./wrappers/PartWrapper";
import ImagePrimitive from "./primitives/ImagePrimitive/ImagePrimitive";
import CarouselMDXPrimitive from "./primitives/CarouselMDXPrimitive";
import compareAsStrings from "@/lib/compareAsStrings";
import isOkToSaveAggregate from "./lib/isOkToSaveAggregate";
import PartHeader from "./primitives/PartHeader";
import { IGenericImageProps, IParts_Gallery } from "../mdxtypes";
import { SelectBlogs } from "@db/schemaBlog";
import { useTranslations } from "next-intl";

interface IGalleryPartFormValues extends IFormValues {
  originalState: IParts_Gallery;
  currentValues: IParts_Gallery;
}

export default function GalleryPart({ blogId }: Pick<SelectBlogs, "blogId">) {
  const tBlogGallery = useTranslations("Blog.ImageGalleryPart");
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
  });

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <div>
      <PartHeader partName={tBlogGallery("part_name")} className="mb-4" />
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
              imageIds: newCurrentValuesImages,
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
    </div>
  );
}
