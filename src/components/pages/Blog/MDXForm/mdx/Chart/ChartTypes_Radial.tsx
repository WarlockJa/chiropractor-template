import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RadialBar, RadialBarChart } from "recharts";
import { ChartConfigCopy } from "../../mdxtypes";

interface IChartTypes_BarProps {
  chartData: { [key: string]: number | string }[];
  chartConfig: ChartConfigCopy;
}

// Radial Chart
const testRadialChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const testRadialChartConfig = {
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

export default function ChartTypes_Radial({
  chartData = testRadialChartData,
  chartConfig = testRadialChartConfig,
}: IChartTypes_BarProps) {
  return (
    <ChartContainer config={chartConfig} className="aspect-video min-h-[200px]">
      <RadialBarChart data={chartData} innerRadius={100} outerRadius={280}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
        />
        <RadialBar dataKey="visitors" background />
      </RadialBarChart>
    </ChartContainer>
  );
}
