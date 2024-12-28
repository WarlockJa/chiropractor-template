import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { ChartConfigCopy } from "../../mdxtypes";

interface IChartTypes_BarProps {
  chartData: { [key: string]: number | string }[];
  chartConfig: ChartConfigCopy;
}

export default function ChartTypes_Pie({
  chartData,
  chartConfig,
}: IChartTypes_BarProps) {
  // pie chart label data
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + Number(curr.visitors), 0);
  }, []);

  // const dataKeys = Object.keys(chartData[0]);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
