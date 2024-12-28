"use client";
import { Button } from "@/components/ui/button";
import {
  BetweenHorizontalStart,
  BetweenVerticalStart,
  TableColumnsSplit,
  TableRowsSplit,
} from "lucide-react";
import generateChartConfig from "../lib/generateChartConfig";
import getNoErrors from "../lib/getNoErrors";
import checkForChartHeaderErrors from "../lib/checkForChartHeaderErrors";
import { IParts_Chart_ChartData, TTableActiveCell } from "../../../../mdxtypes";
import { IChartPrimitiveProps } from "../chartPrimitive";

interface IChartMenu extends IChartPrimitiveProps {
  activeCell: TTableActiveCell;
  setAcitveCell: (newActiveCell: TTableActiveCell) => void;
  errors: (string | undefined)[][];
  setErrors: (
    newErrors: (
      prev: (string | undefined)[][] | null,
    ) => (string | undefined)[][] | (string | undefined)[][],
  ) => void;
  collisionPrefix: string;
}

// adding new column to the table
const addColumn = ({
  activeCell,
  setAcitveCell,
  errors,
  setErrors,
  chartValues,
  setChartValues,
}: Omit<IChartMenu, "collisionPrefix">) => {
  if (!activeCell) return;
  if (!chartValues) return;
  if (!chartValues.chartData) return;
  if (!chartValues.chartConfig) return;

  // updating active cell to focus a newly created column
  setAcitveCell({ ...activeCell, column: activeCell.column + 1 });

  // retaining noErrors state for existing errors array
  const noErrors = getNoErrors(errors);

  // adding new item to errors array for the new column
  setErrors((prev) =>
    prev
      ? prev.map((errorRow) =>
          errorRow
            .slice(0, activeCell.column + 1)
            .concat(undefined, errorRow.slice(activeCell.column + 1)),
        )
      : [],
  );

  // generating a new column index based on possibly existing keys with "New Column <Number>" format
  const currentKeys = Object.keys(chartValues.chartData[0]);
  const newColumnIndex = currentKeys.reduce(
    (idx, cur) =>
      cur.toLowerCase().indexOf("new column") === 0
        ? !isNaN(Number(cur.slice(10))) && Number(cur.slice(10)) >= idx
          ? Number(cur.slice(10)) + 1
          : idx
        : idx,
    1,
  );

  // generating new chartData
  const chartData: IParts_Chart_ChartData<string | number>[] =
    chartValues.chartData.map((row) => {
      let newRow: { [key: string]: string | number } = {};
      // adding column after the last
      if (activeCell.column === Object.keys(row).length - 1) {
        newRow = { ...row };
        newRow[`New Column ${newColumnIndex}`] = 0;
      } else {
        // inserting column in the middle of the existing table
        Object.entries(row).map((entry, index) => {
          if (index === activeCell.column + 1) {
            newRow[`New Column ${newColumnIndex}`] = 0;
          }
          newRow[entry[0]] = entry[1];
        });
      }

      return newRow;
    });

  // generating chartConfig
  const chartConfig = generateChartConfig(chartData[0]);

  // updating chartValues
  setChartValues({ ...chartValues, chartData, chartConfig }, noErrors);
};

// deleting column from the table
const deleteColumn = ({
  activeCell,
  setAcitveCell,
  setErrors,
  chartValues,
  setChartValues,
  collisionPrefix,
}: Omit<IChartMenu, "errors">) => {
  if (!activeCell) return;
  if (!chartValues) return;
  if (!chartValues.chartData) return;
  if (!chartValues.chartConfig) return;

  // STEP 1: Check for collisions
  const pureKeys = Object.keys(chartValues.chartData![0]).map(
    (item, keyIndex) =>
      keyIndex === activeCell.column
        ? null
        : item.includes(collisionPrefix)
          ? item.slice(item.indexOf(collisionPrefix) + collisionPrefix.length)
          : item,
  );

  // STEP 2: add indexed prefixes to collisions
  const prefixedKeys = pureKeys.map((key, keyIndex, source) =>
    source.findIndex(
      (item, srcIndex) => item === key && keyIndex !== srcIndex,
    ) === -1
      ? key
      : `${keyIndex}${collisionPrefix}${key}`,
  );

  // STEP 3: remove activeCell column and modify chartData with new prefixedKeys
  // generating chartData
  const chartData = chartValues.chartData!.map((row) => {
    const newRow: IParts_Chart_ChartData<string | number> = {};

    Object.entries(row).forEach((item, columnIndex) => {
      // skipping column that has been deleted
      if (prefixedKeys[columnIndex]) {
        newRow[prefixedKeys[columnIndex]] = item[1];
      }
    });

    return newRow;
  });

  // generating chartConfig
  const chartConfig = generateChartConfig(chartData[0]);

  // STEP 4: check for errors should check for prefix presence instead of comparison
  // checking for caption errors
  const noErrors = checkForChartHeaderErrors({
    setErrors,
    chartDataCaptions: Object.keys(chartData[0]),
    collisionPrefix,
  });

  // updating active cell to focus away from deleted column
  setAcitveCell({
    ...activeCell,
    column: activeCell.column === 0 ? 0 : activeCell.column - 1,
  });
  // updating chartValues
  setChartValues({ ...chartValues, chartData, chartConfig }, noErrors);
};

// adding new row to the table
const addRow = ({
  activeCell,
  setAcitveCell,
  errors,
  setErrors,
  chartValues,
  setChartValues,
}: Omit<IChartMenu, "collisionPrefix">) => {
  if (!activeCell) return;
  if (!chartValues) return;
  if (!chartValues.chartData) return;
  if (!chartValues.chartConfig) return;

  // updating active cell to focus new row
  setAcitveCell({
    ...activeCell,
    row: activeCell.row !== undefined ? activeCell.row + 1 : 1,
  });

  // generating empty row object
  const newRow: IParts_Chart_ChartData<string | number> = {};
  Object.keys(chartValues.chartData[0]).forEach(
    (item, index) => (newRow[item] = index === 0 ? "" : 0),
  );

  // checking for errors
  const noErrors = getNoErrors(errors);
  const rowLength = Object.keys(chartValues.chartData[0]).length;

  // adding new item to errors array for the new row
  setErrors((prev) =>
    prev
      ? prev
          .slice(0, activeCell.row)
          .concat(
            [Array(rowLength).fill(undefined)],
            prev.slice(activeCell.row),
          )
      : [],
  );

  // generating new chartData
  const chartData = chartValues.chartData
    .slice(0, activeCell.row)
    .concat(newRow, chartValues.chartData.slice(activeCell.row));

  // updating chartValues
  setChartValues({ ...chartValues, chartData }, noErrors);
};

// deleting a row in the table
const deleteRow = ({
  activeCell,
  setAcitveCell,
  errors,
  setErrors,
  chartValues,
  setChartValues,
}: Omit<IChartMenu, "collisionPrefix">) => {
  if (!activeCell) return;
  if (activeCell.row === undefined) return;
  if (!chartValues) return;
  if (!chartValues.chartData) return;
  if (!chartValues.chartConfig) return;

  // calculating new active cell row
  const newActiveCellRow =
    activeCell.row > 1
      ? activeCell.row - 1
      : chartValues.chartData.length > 1
        ? 1
        : undefined;

  setAcitveCell({ ...activeCell, row: newActiveCellRow });

  // checking for errors
  const noErrors = getNoErrors(errors);
  const activeRow = activeCell.row;

  // removing row from errors array
  setErrors((prev) =>
    prev ? prev.slice(0, activeRow).concat(prev.slice(activeRow + 1)) : [],
  );

  // generating new chartData
  const chartData = chartValues.chartData
    .slice(0, activeCell.row - 1)
    .concat(chartValues.chartData.slice(activeCell.row));

  // updating chartValues
  setChartValues({ ...chartValues, chartData }, noErrors);
};

export default function ChartMenu({
  activeCell,
  setAcitveCell,
  chartValues,
  setChartValues,
  errors,
  setErrors,
  collisionPrefix,
}: IChartMenu) {
  return chartValues ? (
    <div className="flex w-full justify-center p-1">
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Insert Column"
        onClick={() =>
          addColumn({
            activeCell,
            setAcitveCell,
            errors,
            setErrors,
            chartValues,
            setChartValues,
          })
        }
      >
        <BetweenVerticalStart />
      </Button>
      <Button
        disabled={
          !activeCell ||
          !chartValues.chartData ||
          Object.keys(chartValues.chartData[0]).length < 2
        }
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Delete Column"
        onClick={() =>
          deleteColumn({
            activeCell,
            setAcitveCell,
            setErrors,
            chartValues,
            setChartValues,
            collisionPrefix,
          })
        }
      >
        <TableColumnsSplit />
      </Button>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Insert Row"
        onClick={() =>
          addRow({
            activeCell,
            errors,
            setErrors,
            setAcitveCell,
            chartValues,
            setChartValues,
          })
        }
      >
        <BetweenHorizontalStart />
      </Button>
      <Button
        disabled={
          !activeCell ||
          !activeCell.row ||
          !chartValues.chartData ||
          chartValues.chartData.length < 2
        }
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Delete Row"
        onClick={() => {
          deleteRow({
            activeCell,
            errors,
            setErrors,
            setAcitveCell,
            chartValues,
            setChartValues,
          });
        }}
      >
        <TableRowsSplit />
      </Button>
    </div>
  ) : null;
}
