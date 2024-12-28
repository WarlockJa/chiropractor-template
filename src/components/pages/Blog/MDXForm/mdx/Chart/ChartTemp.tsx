import { lazy, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChartConfigCopy } from "../../mdxtypes";
const ChartTypes_Bar = lazy(() => import("./ChartTypes_BarVertical"));
const ChartTypes_Pie = lazy(() => import("./ChartTypes_Pie"));
const ChartTypes_Area = lazy(() => import("./ChartTypes_Area"));
const ChartTypes_Line = lazy(() => import("./ChartTypes_Line"));
const ChartTypes_Radar = lazy(() => import("./ChartTypes_Radar"));
const ChartTypes_Radial = lazy(() => import("./ChartTypes_Radial"));

// Bar Chart
const testBarChartData = [
  { month: "January", desktop: 186, mobile: 80, test: 121 },
  { month: "February", desktop: 305, mobile: 200, test: 121 },
  { month: "March", desktop: 237, mobile: 120, test: 121 },
  { month: "April", desktop: 73, mobile: 190, test: 121 },
  { month: "May", desktop: 209, mobile: 130, test: 121 },
  { month: "June", desktop: 214, mobile: 140, test: 121 },
];

const testBarChartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  test: {
    label: "Mobile",
    color: "#f0a5fa",
  },
} satisfies ChartConfigCopy;

// Pie Chart
const testPieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const testPieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfigCopy;

// Area Chart
const testAreaChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const testAreaChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfigCopy;

// Line Chart
const testLineChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const testLineChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfigCopy;

// Radar Chart
const testRadarChartData = [
  { month: "January", desktop: 186, mobile: 69 },
  { month: "February", desktop: 305, mobile: 69 },
  { month: "March", desktop: 237, mobile: 69 },
  { month: "April", desktop: 273, mobile: 69 },
  { month: "May", desktop: 209, mobile: 69 },
  { month: "June", desktop: 214, mobile: 69 },
];

const testRadarChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfigCopy;

const getChart = (type: number): JSX.Element | null => {
  switch (type) {
    // Bar Chart
    case 0:
      return (
        <ChartTypes_Bar
          chartData={testBarChartData}
          chartConfig={testBarChartConfig}
        />
      );

    // Pie Chart
    case 1:
      return (
        <ChartTypes_Pie
          chartData={testPieChartData}
          chartConfig={testPieChartConfig}
        />
      );

    // Area Chart
    case 2:
      return (
        <ChartTypes_Area
          chartData={testAreaChartData}
          chartConfig={testAreaChartConfig}
        />
      );

    // Line Chart
    case 3:
      return (
        <ChartTypes_Line
          chartData={testLineChartData}
          chartConfig={testLineChartConfig}
        />
      );

    // Radar Chart
    case 4:
      return (
        <ChartTypes_Radar
          chartData={testRadarChartData}
          chartConfig={testRadarChartConfig}
        />
      );

    // // Radial Chart
    // case 5:
    //   return (
    //     <ChartTypes_Radial
    //       chartData={testRadialChartData}
    //       chartConfig={testRadialChartConfig}
    //     />
    //   );

    default:
      return null;
  }
};

export default function Chart() {
  const [chartType, setChartType] = useState(0);

  return (
    <div>
      <div>
        <Button type="button" onClick={() => setChartType(0)}>
          Bar Chart
        </Button>
        <Button type="button" onClick={() => setChartType(1)}>
          Pie Chart
        </Button>
        <Button type="button" onClick={() => setChartType(2)}>
          Area Chart
        </Button>
        <Button type="button" onClick={() => setChartType(3)}>
          Line Chart
        </Button>
        <Button type="button" onClick={() => setChartType(4)}>
          Radar Chart
        </Button>
        {/* <Button type="button" onClick={() => setChartType(5)}>
          Radial Chart
        </Button> */}
      </div>
      {getChart(chartType)}
    </div>
  );
}
