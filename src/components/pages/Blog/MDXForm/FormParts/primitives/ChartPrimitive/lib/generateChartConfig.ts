import { ChartConfigCopy, IParts_Chart_ChartData } from "../../../../mdxtypes";

// TODO fix indexing
const MAX_COLORS = 5;

export default function generateChartConfig(
  data: IParts_Chart_ChartData<string | number>,
): ChartConfigCopy {
  const chartConfig: ChartConfigCopy = {};
  Object.keys(data).map((field, index) => {
    if (index > 0) {
      chartConfig[field] = {
        label: field,
        color: `hsl(var(--chart-${(index % MAX_COLORS) + 1}))`,
      };
    }
  });
  return chartConfig;
}
