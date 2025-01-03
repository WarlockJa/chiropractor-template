import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  convertCodesToSpecialCharacters,
  convertSpecialCharactersToCodes,
} from "@/lib/convertStringSpecialCharacters";
import { createId } from "@paralleldrive/cuid2";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import ChartMenu from "./_components/ChartMenu";
import generateChartConfig from "./lib/generateChartConfig";
import ChartTypeMenu from "./_components/ChartTypeMenu";
import checkForChartHeaderErrors from "./lib/checkForChartHeaderErrors";
import getNoErrors from "./lib/getNoErrors";
import handleChartTableArrowKeysNavigation from "./lib/chartTableArrowKeysNavigation";
import {
  ChartConfigCopy,
  IParts_Chart,
  IParts_Chart_ChartData,
  TTableActiveCell,
} from "../../../mdxtypes";
import {
  IChartPrimitiveProps,
  TChartPrimitiveErrorsMatrix,
} from "./chartPrimitive";

const TableColor = "hsl(var(--input))";

// Bar Chart
const initBarChartValues: Omit<IParts_Chart<string | number>, "type"> = {
  chartConfig: {
    desktop: {
      label: "desktop",
      color: "hsl(var(--chart-2))",
    },
    mobile: {
      label: "mobile",
      color: "hsl(var(--chart-3))",
    },
    other: {
      label: "other",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfigCopy,
  chartData: [
    { month: "January", desktop: 186, mobile: 80, other: 121 },
    { month: "February", desktop: 305, mobile: 200, other: 121 },
    { month: "March", desktop: 237, mobile: 120, other: 121 },
    { month: "April", desktop: 73, mobile: 190, other: 121 },
    { month: "May", desktop: 209, mobile: 130, other: 121 },
    { month: "June", desktop: 214, mobile: 140, other: 121 },
  ] satisfies IParts_Chart_ChartData<string | number>[],
  chartTitle: "",
  chartDescription: "",
  chartType: "barVertical",
};

export default function ChartPrimitive({
  chartValues,
  setChartValues,
}: IChartPrimitiveProps) {
  // active cell data used to insert/delete rows and columns
  const [activeCell, setActiveCell] = useState<TTableActiveCell>();
  // errors state
  const [errors, setErrors] = useState<TChartPrimitiveErrorsMatrix>(
    chartValues.chartData
      ? Array(chartValues.chartData.length + 1).fill(
          Array(Object.keys(chartValues.chartData[0]).length).fill(undefined),
        )
      : Array(initBarChartValues.chartData!.length + 1).fill(
          Array(Object.keys(initBarChartValues.chartData![0]).length).fill(
            undefined,
          ),
        ),
  );
  // collision prefix that will discern erroneous keys with the same value inside of the chartData object
  const collisionPrefix = useMemo(() => createId(), []);

  // creating a table with default values if tableData doesn't exist
  useLayoutEffect(() => {
    if (!chartValues.chartConfig || !chartValues.chartData)
      setChartValues({ ...chartValues, ...initBarChartValues }, true);
  }, []);

  // table ref to be used for arrow keys navigation
  const tableRef = useRef<HTMLTableElement>(null);

  return (
    chartValues.chartData &&
    chartValues.chartConfig && (
      <>
        <div className="flex">
          <ChartTypeMenu
            chartType={chartValues.chartType}
            setChartType={(chartType) => {
              const noErrors = getNoErrors(errors);
              setChartValues({ ...chartValues, chartType }, noErrors);
            }}
          />
          <ChartMenu
            activeCell={activeCell}
            setAcitveCell={setActiveCell}
            chartValues={chartValues}
            setChartValues={setChartValues}
            errors={errors}
            setErrors={setErrors}
            collisionPrefix={collisionPrefix}
          />
        </div>
        <Table ref={tableRef}>
          <TableHeader>
            <TableRow>
              {Object.keys(chartValues.chartData[0]).map((key, index) => (
                <TableHead
                  key={`tableHead${index}${chartValues.chartData!.length}`}
                  className="font-semibold text-foreground transition-colors"
                >
                  <Input
                    tabIndex={index > 0 ? -1 : undefined}
                    onKeyDown={(e) =>
                      handleChartTableArrowKeysNavigation({
                        e,
                        activeCell,
                        tableRef,
                      })
                    }
                    defaultValue={convertCodesToSpecialCharacters(
                      key.includes(collisionPrefix)
                        ? key.slice(
                            key.indexOf(collisionPrefix) +
                              collisionPrefix.length,
                          )
                        : key,
                    )}
                    onFocus={() => setActiveCell({ row: 0, column: index })}
                    style={
                      activeCell?.column === index
                        ? errors[0][index]
                          ? {
                              border: `1px solid hsl(var(--destructive))`,
                              backgroundColor: TableColor,
                            }
                          : { backgroundColor: TableColor }
                        : errors[0][index]
                          ? { border: `1px solid hsl(var(--destructive))` }
                          : undefined
                    }
                    onChange={(e) => {
                      // STEP 1: Check for collisions
                      const pureKeys = Object.keys(
                        chartValues.chartData![0],
                      ).map((item, headerIndex) => {
                        const value =
                          index === headerIndex
                            ? convertSpecialCharactersToCodes(
                                e.target.value.trim(),
                              )
                            : item;
                        return value.includes(collisionPrefix)
                          ? value.slice(
                              value.indexOf(collisionPrefix) +
                                collisionPrefix.length,
                            )
                          : value;
                      });

                      // STEP 2: add indexed prefixes to collisions
                      const prefixedKeys = pureKeys.map(
                        (key, keyIndex, source) =>
                          source.findIndex(
                            (item, srcIndex) =>
                              item === key && keyIndex !== srcIndex,
                          ) === -1
                            ? key
                            : `${keyIndex}${collisionPrefix}${key}`,
                      );

                      // STEP 3: modify chartData with new keys
                      // generating chartData
                      const chartData = chartValues.chartData!.map((row) => {
                        const newRow: IParts_Chart_ChartData<string | number> =
                          {};
                        Object.entries(row).forEach(
                          (item, columnIndex) =>
                            (newRow[prefixedKeys[columnIndex]] = item[1]),
                        );

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

                      // saving to formValues
                      setChartValues(
                        { ...chartValues, chartData, chartConfig },
                        noErrors,
                      );
                    }}
                  />
                  {errors[0][index] ? (
                    <p className="text-destructive">{errors[0][index]}</p>
                  ) : (
                    <p className="text-transparent" aria-hidden>
                      blank
                    </p>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {chartValues.chartData.map((row, rowIndex) => (
              <TableRow
                key={`tableBodyRow${rowIndex}${chartValues.chartData!.length}`}
                style={
                  activeCell?.row === rowIndex + 1
                    ? { backgroundColor: TableColor }
                    : undefined
                }
              >
                {Object.values(row).map((value, columnIndex) => {
                  return (
                    <TableCell
                      key={`tableBodyColumn${columnIndex}${errors[0].length}`}
                    >
                      <Input
                        tabIndex={-1}
                        onKeyDown={(e) =>
                          handleChartTableArrowKeysNavigation({
                            e,
                            activeCell,
                            tableRef,
                          })
                        }
                        defaultValue={convertCodesToSpecialCharacters(
                          value.toString(),
                        )}
                        onFocus={() =>
                          setActiveCell({
                            row: rowIndex + 1,
                            column: columnIndex,
                          })
                        }
                        style={
                          activeCell?.column === columnIndex
                            ? errors[rowIndex + 1][columnIndex]
                              ? {
                                  border: `1px solid hsl(var(--destructive))`,
                                  backgroundColor: TableColor,
                                }
                              : {
                                  backgroundColor: TableColor,
                                }
                            : undefined
                        }
                        onChange={(e) => {
                          if (!activeCell || activeCell.row === undefined)
                            return;

                          // checking for error i.e. input is not a number
                          const isError =
                            columnIndex > 0 && isNaN(Number(e.target.value));
                          setErrors((prev) =>
                            prev.map((errorRow, errorRowIndex) =>
                              errorRowIndex === rowIndex + 1
                                ? errorRow.map(
                                    (errorColumn, errorColumnIndex) =>
                                      errorColumnIndex === columnIndex
                                        ? isError
                                          ? "Value is not a number"
                                          : undefined
                                        : errorColumn,
                                  )
                                : errorRow,
                            ),
                          );

                          // saving to chartValues
                          const newCellValue =
                            columnIndex > 0
                              ? Number(e.target.value.trim())
                              : convertSpecialCharactersToCodes(
                                  e.target.value.trim(),
                                );

                          const chartData = chartValues.chartData!.map(
                            (currentRow, currentRowIndex) => {
                              if (activeCell.row! - 1 === currentRowIndex) {
                                const newRow = currentRow;
                                newRow[
                                  Object.keys(currentRow)[activeCell.column]
                                ] = newCellValue;

                                return newRow;
                              } else return currentRow;
                            },
                          );

                          // retaining error state from the errors array
                          const noErrors = !isError && getNoErrors(errors);

                          // saving to formValues
                          setChartValues(
                            { ...chartValues, chartData },
                            noErrors,
                          );
                        }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  );
}
