import { Button } from "@/components/ui/button";
import {
  AreaChart,
  BarChart3,
  BarChartHorizontal,
  Hexagon,
  LineChart,
  LoaderCircle,
  PieChart,
} from "lucide-react";
import { TParts_Chart_ChartTypes } from "../../../../mdxtypes";

interface IChartTypeMenuProps {
  chartType: TParts_Chart_ChartTypes;
  setChartType: (newChartType: TParts_Chart_ChartTypes) => void;
}

export default function ChartTypeMenu({
  setChartType,
  chartType,
}: IChartTypeMenuProps) {
  return (
    <div className="flex w-full justify-center p-1">
      <Button
        size={"icon"}
        disabled={chartType === "barVertical"}
        variant={"outline"}
        type="button"
        title="Bar Chart Vertical"
        onClick={() => setChartType("barVertical")}
      >
        <BarChart3 />
      </Button>
      <Button
        size={"icon"}
        disabled={chartType === "barHorizontal"}
        variant={"outline"}
        type="button"
        title="Bar Chart Horizontal"
        onClick={() => setChartType("barHorizontal")}
      >
        <BarChartHorizontal />
      </Button>
      <Button
        size={"icon"}
        disabled={chartType === "line"}
        variant={"outline"}
        type="button"
        title="Line Chart"
        onClick={() => setChartType("line")}
      >
        <LineChart />
      </Button>
      <Button
        size={"icon"}
        disabled={chartType === "area"}
        variant={"outline"}
        type="button"
        title="Area Chart"
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
        title="Radar Chart"
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
