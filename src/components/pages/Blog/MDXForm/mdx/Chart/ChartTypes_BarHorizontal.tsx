import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartConfigCopy, IParts_Chart_ChartData } from "../../mdxtypes";

interface IChartTypes_BarProps {
  chartData: IParts_Chart_ChartData<string | number>[];
  chartConfig: ChartConfigCopy;
}

export default function ChartTypes_BarHorizontal({
  chartData,
  chartConfig,
}: IChartTypes_BarProps) {
  const dataKeys = Object.keys(chartData[0]);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        barSize={48}
        margin={{
          left: -20,
        }}
      >
        <XAxis type="number" hide />
        <YAxis
          dataKey={dataKeys[0]}
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        {dataKeys
          .filter((_, index) => index > 0)
          .map((item) => (
            <Bar
              key={item}
              dataKey={item}
              stackId="a"
              fill={chartConfig[item].color}
              radius={
                item === dataKeys[1]
                  ? [4, 0, 0, 4]
                  : item === dataKeys[dataKeys.length - 1]
                    ? [0, 4, 4, 0]
                    : [0, 0, 0, 0]
              }
            />
          ))}
      </BarChart>
    </ChartContainer>
  );
}
