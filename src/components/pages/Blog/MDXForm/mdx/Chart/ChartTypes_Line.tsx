import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import { ChartConfigCopy } from "../../mdxtypes";

interface IChartTypes_BarProps {
  chartData: { [key: string]: number | string }[];
  chartConfig: ChartConfigCopy;
}

export default function ChartTypes_Line({
  chartData,
  chartConfig,
}: IChartTypes_BarProps) {
  const dataKeys = Object.keys(chartData[0]);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
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
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {dataKeys
          .filter((_, index) => index > 0)
          .map((item) => (
            <Line
              key={item}
              type="monotone"
              dataKey={item}
              stroke={chartConfig[item].color}
              strokeWidth={2}
              dot={{ fill: chartConfig[item].color }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          ))}
      </LineChart>
    </ChartContainer>
  );
}
