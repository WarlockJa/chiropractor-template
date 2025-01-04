import isDeepEqual from "@/lib/isDeepEqual";
import ChartPrimitive from "./primitives/ChartPrimitive/ChartPrimitive";
import { usePartWrapperContext } from "./wrappers/PartWrapper";
import SimpleTextPrimitive from "./primitives/SimpleTextPrimitive";
import PartHeader from "./primitives/PartHeader";
import { IParts_Chart } from "../mdxtypes";
import { useTranslations } from "next-intl";

interface IChartPartFormValues extends IFormValues {
  originalState: IParts_Chart<string | number>;
  currentValues: IParts_Chart<string | number>;
}

export default function ChartPart() {
  const tBlogChart = useTranslations("Blog.ChartPart");
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: IChartPartFormValues;
    setFormValues: React.Dispatch<React.SetStateAction<IChartPartFormValues>>;
  };

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <>
      <PartHeader partName={tBlogChart("part_name")} />
      <SimpleTextPrimitive
        labelText={tBlogChart("text_label")}
        placeholderText={tBlogChart("text_placeholder")}
        text={formValues.currentValues.chartTitle ?? ""}
        setText={(chartTitle) =>
          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, chartTitle },
            isOkToSave: prev.originalState.chartTitle !== chartTitle,
          }))
        }
      />
      <SimpleTextPrimitive
        labelText={tBlogChart("text2_label")}
        placeholderText={tBlogChart("text2_placeholder")}
        text={formValues.currentValues.chartDescription ?? ""}
        setText={(chartDescription) =>
          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, chartDescription },
            isOkToSave:
              prev.originalState.chartDescription !== chartDescription,
          }))
        }
      />
      <ChartPrimitive
        chartValues={formValues.currentValues}
        setChartValues={(chartValues, noErrors) =>
          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, ...chartValues },
            isOkToSave: !isDeepEqual(prev.originalState, chartValues),
            noErrors,
          }))
        }
      />
    </>
  );
}
