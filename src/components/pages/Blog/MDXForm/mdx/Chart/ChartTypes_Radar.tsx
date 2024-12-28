import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { ChartConfigCopy } from "../../mdxtypes";

interface IChartTypes_BarProps {
  chartData: { [key: string]: number | string }[];
  chartConfig: ChartConfigCopy;
}

export default function ChartTypes_Radar({
  chartData,
  chartConfig,
}: IChartTypes_BarProps) {
  const dataKeys = Object.keys(chartData[0]);
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-video min-h-[200px]"
    >
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <PolarAngleAxis dataKey={dataKeys[0]} />
        <PolarGrid />
        {dataKeys
          .filter((_, index) => index > 0)
          .map((item) => (
            <Radar
              key={item}
              dataKey={item}
              fill={chartConfig[item].color}
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          ))}
      </RadarChart>
    </ChartContainer>
  );
}
