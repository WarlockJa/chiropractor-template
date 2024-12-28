import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfigCopy } from "../../mdxtypes";

interface IChartTypes_BarProps {
  chartData: { [key: string]: string | number }[];
  chartConfig: ChartConfigCopy;
}

export default function ChartTypes_BarVertical({
  chartData,
  chartConfig,
}: IChartTypes_BarProps) {
  const dataKeys = Object.keys(chartData[0]);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKeys[0]}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {dataKeys
          .filter((_, index) => index > 0)
          .map((item) => (
            <Bar
              key={item}
              dataKey={item}
              fill={chartConfig[item].color}
              radius={4}
            />
          ))}
      </BarChart>
    </ChartContainer>
  );
}
