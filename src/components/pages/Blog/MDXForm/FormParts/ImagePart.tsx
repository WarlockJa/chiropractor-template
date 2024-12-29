import { usePartWrapperContext } from "./wrappers/PartWrapper";
import ImagePrimitive from "./primitives/ImagePrimitive/ImagePrimitive";
import { useState } from "react";
import isOkToSaveAggregate from "./lib/isOkToSaveAggregate";
import PartHeader from "./primitives/PartHeader";
import { IGenericImageProps, IParts_Image } from "../mdxtypes";
import { SelectBlogs } from "@db/schemaBlog";

interface IImagePartFormValues extends IFormValues {
  originalState: IParts_Image;
  currentValues: IParts_Image;
}

export default function ImagePart({ blogId }: Pick<SelectBlogs, "blogId">) {
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: IImagePartFormValues;
    setFormValues: React.Dispatch<React.SetStateAction<IImagePartFormValues>>;
  };

  // primitive isOkToSave aggregate
  const [isOkToSavePart, setIsOkToSavePart] = useState({
    image: false,
  });

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <>
      <PartHeader partName="Image Part" />
      <ImagePrimitive
        blogId={blogId}
        imageId={formValues.currentValues.imageId}
        setImageId={({ imageId }: Pick<IGenericImageProps, "imageId">) => {
          // evaluating if it is ok to save the whole part
          // finding if a primitive has changed
          const image = formValues.originalState.imageId !== imageId;
          // saving change state for the primitive
          setIsOkToSavePart((prev) => ({ ...prev, image }));

          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { image },
          });

          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, imageId },
            isOkToSave,
          }));
        }}
      />
    </>
  );
}
