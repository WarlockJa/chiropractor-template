import { lazy, useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertCodesToSpecialCharacters } from "@/lib/convertStringSpecialCharacters";
import {
  ChartConfigCopy,
  IParts_Chart,
  IParts_Chart_ChartData,
  TParts_Chart_ChartTypes,
} from "../../mdxtypes";

const ChartTypes_BarVertical = lazy(() => import("./ChartTypes_BarVertical"));
const ChartTypes_BarHorizontal = lazy(
  () => import("./ChartTypes_BarHorizontal"),
);
const ChartTypes_Pie = lazy(() => import("./ChartTypes_Pie"));
const ChartTypes_Area = lazy(() => import("./ChartTypes_Area"));
const ChartTypes_Line = lazy(() => import("./ChartTypes_Line"));
const ChartTypes_Radar = lazy(() => import("./ChartTypes_Radar"));
const ChartTypes_Radial = lazy(() => import("./ChartTypes_Radial"));

const getChart = ({
  chartType,
  chartData,
  chartConfig,
}: IParts_Chart<string | number>): JSX.Element | null => {
  if (!chartData || !chartConfig) return <h1>Chart Data not found</h1>;
  switch (chartType) {
    // Bar Chart Vertical
    case "barVertical":
      return (
        <ChartTypes_BarVertical
          chartData={chartData}
          chartConfig={chartConfig}
        />
      );

    // Bar Chart Horizontal
    case "barHorizontal":
      return (
        <ChartTypes_BarHorizontal
          chartData={chartData}
          chartConfig={chartConfig}
        />
      );

    // // Pie Chart
    // case "pie":
    //   return <ChartTypes_Pie chartData={chartData} chartConfig={chartConfig} />;

    // Area Chart
    case "area":
      return (
        <ChartTypes_Area chartData={chartData} chartConfig={chartConfig} />
      );

    // Line Chart
    case "line":
      return (
        <ChartTypes_Line chartData={chartData} chartConfig={chartConfig} />
      );

    // Radar Chart
    case "radar":
      return (
        <ChartTypes_Radar chartData={chartData} chartConfig={chartConfig} />
      );

    // // Radial Chart
    // case "radial":
    //   return (
    //     <ChartTypes_Radial
    //       chartData={chartData}
    //       chartConfig={chartConfig}
    //     />
    //   );

    default:
      return null;
  }
};

export default function Chart({
  chartData,
  chartConfig,
  chartType,
  chartTitle,
  chartDescription,
}: {
  chartData: string | undefined;
  chartConfig: string | undefined;
  chartType: string | undefined;
  chartTitle?: string;
  chartDescription?: string;
}) {
  const data: IParts_Chart<string | number> = {
    type: 8,
    chartConfig: undefined,
    chartData: undefined,
    chartType: "barVertical",
    chartTitle: "",
    chartDescription: "",
  };

  const chartContent = useMemo(() => {
    try {
      data["chartData"] = parseChartDataCodesToCharacters(
        JSON.parse(chartData!),
      );
      data["chartConfig"] = parseChartConfigCodesToCharacters(
        JSON.parse(chartConfig!),
      );
      data["chartType"] = chartType as TParts_Chart_ChartTypes;

      return data ? getChart({ ...data }) : null;
    } catch (error) {
      return null;
    }
  }, [chartData, chartConfig, chartType]);

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        {chartTitle && <CardTitle>{chartTitle}</CardTitle>}
        {chartDescription && (
          <CardDescription>{chartDescription}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-0">{chartContent}</CardContent>
    </Card>
  );
}

const parseChartDataCodesToCharacters = (
  data: IParts_Chart_ChartData<string | number>[] | undefined,
) => {
  if (!data) return;
  const dataValues = structuredClone(data);

  return dataValues.map((item) => {
    const result: IParts_Chart_ChartData<string | number> = {};
    Object.entries(item).forEach(
      ([key, value]) =>
        (result[convertCodesToSpecialCharacters(key)] =
          typeof value === "number"
            ? value
            : convertCodesToSpecialCharacters(value)),
    );
    return result;
  });
};

const parseChartConfigCodesToCharacters = (
  data: ChartConfigCopy | undefined,
) => {
  if (!data) return;
  const dataValues = structuredClone(data);

  const result: ChartConfigCopy = {};
  Object.entries(dataValues).forEach(
    ([key, value]) =>
      (result[convertCodesToSpecialCharacters(key)] = {
        ...value,
        label: convertCodesToSpecialCharacters(value.label),
      }),
  );

  return result;
};
