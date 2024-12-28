import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfigCopy } from "../../mdxtypes";

interface IChartTypes_BarProps {
  chartData: { [key: string]: number | string }[];
  chartConfig: ChartConfigCopy;
}

export default function ChartTypes_Area({
  chartData,
  chartConfig,
}: IChartTypes_BarProps) {
  const dataKeys = Object.keys(chartData[0]);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKeys[0]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        {dataKeys
          .filter((_, index) => index > 0)
          .map((item) => (
            <Area
              key={item}
              dataKey={item}
              type="natural"
              fill={chartConfig[item].color}
              fillOpacity={0.4}
              stroke={chartConfig[item].color}
              stackId="a"
            />
          ))}
      </AreaChart>
    </ChartContainer>
  );
}
