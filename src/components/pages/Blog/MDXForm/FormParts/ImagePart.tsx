import { usePartWrapperContext } from "./wrappers/PartWrapper";
import ImagePrimitive from "./primitives/ImagePrimitive/ImagePrimitive";
import SimpleTextPrimitive from "./primitives/SimpleTextPrimitive";
import { useState } from "react";
import isOkToSaveAggregate from "./lib/isOkToSaveAggregate";
import PartHeader from "./primitives/PartHeader";
import { IParts_Image } from "../mdxtypes";

interface IImagePartFormValues extends IFormValues {
  originalState: IParts_Image;
  currentValues: IParts_Image;
}

export default function ImagePart({ blogId }: { blogId: number }) {
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: IImagePartFormValues;
    setFormValues: React.Dispatch<React.SetStateAction<IImagePartFormValues>>;
  };

  // primitive isOkToSave aggregate
  const [isOkToSavePart, setIsOkToSavePart] = useState({
    simpleText: false,
    image: false,
  });

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <>
      <PartHeader partName="Image Part" />
      <ImagePrimitive
        blogId={blogId}
        imgSrc={formValues.currentValues.name}
        setImgSrcAndAria={(data: {
          name: string;
          aria?: string;
          imageId: number | null;
        }) => {
          // evaluating if it is ok to save the whole part
          // finding if a primitive has changed
          const image = formValues.originalState.name !== data.name;
          // saving change state for the primitive
          setIsOkToSavePart((prev) => ({ ...prev, image }));

          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { image },
          });

          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, ...data },
            isOkToSave,
          }));
        }}
      />
      <SimpleTextPrimitive
        setText={(text: string) => {
          // evaluating if it is ok to save the whole part
          // finding if a primitive has changed
          const simpleText = formValues.originalState.aria !== text;
          // saving change state for the primitive
          setIsOkToSavePart((prev) => ({ ...prev, simpleText }));

          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { simpleText },
            override: {
              value: Boolean(formValues.currentValues.name),
            },
          });

          setFormValues((prev) => ({
            ...prev,
            // TODO should be no aria passed from the client
            currentValues: { ...prev.currentValues, aria: text },
            isOkToSave,
          }));
        }}
        labelText="Blog Image Description"
        text={formValues.currentValues.aria}
        placeholderText="Image description"
      />
    </>
  );
}
