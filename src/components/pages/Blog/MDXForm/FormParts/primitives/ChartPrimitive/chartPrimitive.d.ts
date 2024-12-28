import { IParts_Chart, TTableActiveCell } from "../../../mdxtypes";

type TChartPrimitiveErrorsMatrix = (string | undefined)[][];

interface IChartPrimitiveProps {
  chartValues: IParts_Chart<string | number>;
  setChartValues: (
    newChartValues: IParts_Chart<string | number>,
    errors: boolean,
  ) => void;
}

interface chartTableArrowKeysNavigation {
  e: React.KeyboardEvent<HTMLInputElement>;
  tableRef: React.RefObject<HTMLTableElement>;
  activeCell: TTableActiveCell;
}
