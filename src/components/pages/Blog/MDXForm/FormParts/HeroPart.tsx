import SimpleTextPrimitive from "./primitives/SimpleTextPrimitive";
import { usePartWrapperContext } from "./wrappers/PartWrapper";
import ImagePrimitive from "./primitives/ImagePrimitive/ImagePrimitive";
import { useState } from "react";
import isOkToSaveAggregate from "./lib/isOkToSaveAggregate";
import PartHeader from "./primitives/PartHeader";
import { IGenericImageProps, IParts_Hero } from "../mdxtypes";
import { SelectBlogs } from "@db/schemaBlog";
import { useTranslations } from "next-intl";

interface IHeroPartFormValues extends IFormValues {
  originalState: IParts_Hero;
  currentValues: IParts_Hero;
}

// Hero part edit form
export default function HeroPart({ blogId }: Pick<SelectBlogs, "blogId">) {
  const tBlogHero = useTranslations("Blog.HeroPart");
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: IHeroPartFormValues;
    setFormValues: React.Dispatch<React.SetStateAction<IHeroPartFormValues>>;
  };

  // primitive isOkToSave aggregate
  const [isOkToSavePart, setIsOkToSavePart] = useState({
    simpleText: false,
    image: false,
    mdxEditor: false,
  });

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <>
      <PartHeader partName={tBlogHero("part_name")} />
      <SimpleTextPrimitive
        labelText={tBlogHero("text_label")}
        placeholderText={tBlogHero("text_placeholder")}
        setText={(text: string) => {
          // evaluating if it is ok to save the whole part
          // finding if a primitive has changed
          const simpleText = formValues.originalState.title !== text;
          // saving change state for the primitive
          setIsOkToSavePart((prev) => ({ ...prev, simpleText }));

          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { simpleText },
            override: {
              value: Boolean(formValues.currentValues.imageId),
            },
          });

          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, title: text },
            isOkToSave,
          }));
        }}
        text={formValues.currentValues.title}
        required
      />

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
            currentValues: {
              ...prev.currentValues,
              imageId,
            },
            isOkToSave,
          }));
        }}
      />

      <SimpleTextPrimitive
        labelText={tBlogHero("text2_label")}
        placeholderText={tBlogHero("text2_placeholder")}
        setText={(text: string) => {
          // evaluating if it is ok to save the whole part
          // finding if a primitive has changed
          const simpleText = formValues.originalState.description !== text;
          // saving change state for the primitive
          setIsOkToSavePart((prev) => ({ ...prev, simpleText }));

          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { simpleText },
            override: {
              value: Boolean(formValues.currentValues.imageId),
            },
          });

          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, description: text },
            isOkToSave,
          }));
        }}
        text={formValues.currentValues.description}
      />

      {!isOkToSavePart.image && !formValues.currentValues.imageId && (
        <p className="bg-destructive p-2 text-destructive-foreground">
          {tBlogHero("warning_image")}
        </p>
      )}
    </>
  );
}
