import { usePartWrapperContext } from "./wrappers/PartWrapper";
import MDXEditorPrimitive from "./primitives/MDXEditorPrimitive";
import SimpleTextPrimitive from "./primitives/SimpleTextPrimitive";
import { useState } from "react";
import isOkToSaveAggregate from "./lib/isOkToSaveAggregate";
import PartHeader from "./primitives/PartHeader";
import { IParts_Paragraph } from "../mdxtypes";
import { useTranslations } from "next-intl";

interface IParagraphPartFormValues extends IFormValues {
  originalState: IParts_Paragraph;
  currentValues: IParts_Paragraph;
}

// Paragraph part edit form
export default function ParagraphPart() {
  const tBlogParagraph = useTranslations("Blog.ParagraphPart");
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: IParagraphPartFormValues;
    setFormValues: React.Dispatch<
      React.SetStateAction<IParagraphPartFormValues>
    >;
  };

  // primitive isOkToSave aggregate
  const [isOkToSavePart, setIsOkToSavePart] = useState({
    simpleText: false,
    mdxEditor: false,
  });

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <>
      <PartHeader partName={tBlogParagraph("part_name")} />
      <SimpleTextPrimitive
        labelText={tBlogParagraph("text_label")}
        placeholderText={tBlogParagraph("text_placeholder")}
        setText={(title) => {
          // evaluating if it is ok to save the whole part
          // finding if simple text has changes
          const simpleText = formValues.originalState.title !== title;
          // saving change state for the simple text
          setIsOkToSavePart((prev) => ({ ...prev, simpleText }));

          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { simpleText },
          });

          // updating formValues
          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, title },
            isOkToSave,
          }));
        }}
        text={formValues.currentValues.title}
      />
      <MDXEditorPrimitive
        markdown={formValues.currentValues.text}
        setMarkdown={(text) => {
          // evaluating if it is ok to save the whole part
          // finding if mdxEditor text has changes
          const mdxEditor = formValues.originalState.text !== text;
          // saving change state for the simple text
          setIsOkToSavePart((prev) => ({ ...prev, mdxEditor }));

          // comparing with the rest of the primitives
          const isOkToSave = isOkToSaveAggregate({
            aggregate: isOkToSavePart,
            current: { mdxEditor },
          });

          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, text },
            isOkToSave,
          }));
        }}
        labelText={tBlogParagraph("mdx_label")}
        showPlugins
      />
    </>
  );
}
