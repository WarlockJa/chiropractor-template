import { Button } from "@/components/ui/button";
import {
  AreaChart,
  BarChart3,
  BarChartHorizontal,
  Hexagon,
  LineChart,
} from "lucide-react";
import { TParts_Chart_ChartTypes } from "../../../../mdxtypes";
import { useTranslations } from "next-intl";

interface IChartTypeMenuProps {
  chartType: TParts_Chart_ChartTypes;
  setChartType: (newChartType: TParts_Chart_ChartTypes) => void;
}

export default function ChartTypeMenu({
  setChartType,
  chartType,
}: IChartTypeMenuProps) {
  const tBlogChart = useTranslations("Blog.ChartPart");
  return (
    <div className="flex w-full justify-center p-1">
      <Button
        size={"icon"}
        disabled={chartType === "barVertical"}
        variant={"outline"}
        type="button"
        title={tBlogChart("chart_type_bar_vertical")}
        onClick={() => setChartType("barVertical")}
      >
        <BarChart3 />
      </Button>
      <Button
        size={"icon"}
        disabled={chartType === "barHorizontal"}
        variant={"outline"}
        type="button"
        title={tBlogChart("chart_type_bar_horizontal")}
        onClick={() => setChartType("barHorizontal")}
      >
        <BarChartHorizontal />
      </Button>
      <Button
        size={"icon"}
        disabled={chartType === "line"}
        variant={"outline"}
        type="button"
        title={tBlogChart("chart_type_line")}
        onClick={() => setChartType("line")}
      >
        <LineChart />
      </Button>
      <Button
        size={"icon"}
        disabled={chartType === "area"}
        variant={"outline"}
        type="button"
        title={tBlogChart("chart_type_area")}
        onClick={() => setChartType("area")}
      >
        <AreaChart />
      </Button>
      {/* <Button
        size={"icon"}
        disabled={chartType === "pie"}
        variant={"outline"}
        type="button"
        title="Pie Chart"
        onClick={() => setChartType("pie")}
      >
        <PieChart />
      </Button> */}
      <Button
        size={"icon"}
        disabled={chartType === "radar"}
        variant={"outline"}
        type="button"
        title={tBlogChart("chart_type_radar")}
        onClick={() => setChartType("radar")}
      >
        <Hexagon />
      </Button>
      {/* <Button
        size={"icon"}
        disabled={chartType === "radial"}
        variant={"outline"}
        type="button"
        title="Radial Chart"
        onClick={() => setChartType("radial")}
      >
        <LoaderCircle />
      </Button> */}
    </div>
  );
}
