"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLayoutEffect, useRef, useState } from "react";
import TableMenu from "./_components/TableMenu";
import {
  convertCodesToSpecialCharacters,
  convertSpecialCharactersToCodes,
} from "@/lib/convertStringSpecialCharacters";
import handleTableArrowKeysNavigation from "./lib/tableArrowKeysNavigation";
import { IParts_TableMDX_TableData, TTableActiveCell } from "../../../mdxtypes";

export const TableColor = "hsl(var(--muted))";

const InitTableData: IParts_TableMDX_TableData = {
  tableCaption: "Table Caption",
  tableHeader: [
    {
      caption: "Product",
      style: {
        textAlign: "left",
      },
    },
    {
      caption: "Amount",
      style: {
        textAlign: "left",
      },
    },
    {
      caption: "Price",
      style: {
        textAlign: "left",
      },
    },
  ],
  tableBody: [
    ["Apples", "3", "3"],
    ["Oranges", "5", "5"],
    ["Watermelons", "1", "10"],
  ],
  tableFooter: ["Total", "", "44"],
};

export interface ITableMDXPrimitiveProps {
  tableData: IParts_TableMDX_TableData | undefined;
  setTableData: (newTableData: IParts_TableMDX_TableData) => void;
}

export default function TableMDXPrimitive({
  tableData,
  setTableData,
}: ITableMDXPrimitiveProps) {
  // active cell data used to insert/delete rows and columns
  const [activeCell, setActiveCell] = useState<TTableActiveCell>();
  // creating a table with default values if tableData doesn't exist
  useLayoutEffect(() => {
    if (tableData) return;

    setTableData(InitTableData);
  }, []);

  // table ref to be used for arrow keys navigation
  const tableRef = useRef<HTMLTableElement>(null);

  return (
    tableData && (
      <>
        <TableMenu
          activeCell={activeCell}
          setAcitveCell={setActiveCell}
          tableData={tableData}
          setTableData={setTableData}
        />

        <Table ref={tableRef}>
          <TableCaption>
            <Input
              className="text-center placeholder:text-muted"
              defaultValue={convertCodesToSpecialCharacters(
                tableData.tableCaption,
              )}
              placeholder="Table Caption"
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  delete tableData.tableCaption;
                }
                setTableData({
                  ...tableData,
                  tableCaption: convertSpecialCharactersToCodes(
                    e.target.value.trim(),
                  ),
                });
              }}
            />
          </TableCaption>

          <TableHeader>
            <TableRow>
              {tableData.tableHeader.map((headerItem, index) => (
                <TableHead
                  key={`tableHeader${index}${headerItem.caption}`}
                  className={"transition-colors"}
                >
                  <Input
                    tabIndex={index > 0 ? -1 : undefined}
                    onKeyDown={(e) =>
                      handleTableArrowKeysNavigation({
                        e,
                        activeCell,
                        tableRef,
                      })
                    }
                    defaultValue={convertCodesToSpecialCharacters(
                      headerItem.caption,
                    )}
                    onChange={(e) => {
                      const newHeaderItem = {
                        ...tableData.tableHeader[index],
                        caption: convertSpecialCharactersToCodes(
                          e.target.value.trim(),
                        ),
                      };
                      setTableData({
                        ...tableData,
                        tableHeader: tableData.tableHeader
                          .slice(0, index)
                          .concat(
                            newHeaderItem,
                            tableData.tableHeader.slice(index + 1),
                          ),
                      });
                    }}
                    onFocus={() => setActiveCell({ row: 0, column: index })}
                    style={
                      activeCell?.column === index
                        ? { ...headerItem.style, backgroundColor: TableColor }
                        : headerItem.style
                    }
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.tableBody.map((bodyRow, rowIndex) => (
              <TableRow
                key={`tableRow${rowIndex}${tableData.tableBody.length}`}
                style={
                  activeCell?.row === rowIndex + 1
                    ? { backgroundColor: TableColor }
                    : undefined
                }
              >
                {bodyRow.map((bodyCell, columnIndex) => (
                  <TableCell
                    key={`tableCell${rowIndex}${columnIndex}${bodyRow.length}`}
                    className={"transition-colors"}
                  >
                    <Input
                      tabIndex={-1}
                      onKeyDown={(e) =>
                        handleTableArrowKeysNavigation({
                          e,
                          activeCell,
                          tableRef,
                        })
                      }
                      defaultValue={convertCodesToSpecialCharacters(bodyCell)}
                      onChange={(e) => {
                        const newTableBody = tableData.tableBody;
                        newTableBody[rowIndex][columnIndex] =
                          convertSpecialCharactersToCodes(
                            e.target.value.trim(),
                          );
                        setTableData({ ...tableData, tableBody: newTableBody });
                      }}
                      onFocus={() =>
                        setActiveCell({
                          row: rowIndex + 1,
                          column: columnIndex,
                        })
                      }
                      style={
                        activeCell?.column === columnIndex
                          ? {
                              ...tableData.tableHeader[columnIndex].style,
                              backgroundColor: TableColor,
                            }
                          : tableData.tableHeader[columnIndex].style
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              {(tableData.tableFooter
                ? tableData.tableFooter
                : Array<string>(tableData.tableHeader.length).fill("")
              ).map((item, index) => (
                <TableCell
                  key={`tableFooter${index}`}
                  className={"transition-colors"}
                >
                  <Input
                    tabIndex={-1}
                    onKeyDown={(e) =>
                      handleTableArrowKeysNavigation({
                        e,
                        activeCell,
                        tableRef,
                      })
                    }
                    defaultValue={convertCodesToSpecialCharacters(item)}
                    onChange={(e) => {
                      if (e.target.value.trim() !== "") {
                        setTableData({
                          ...tableData,
                          tableFooter: (tableData.tableFooter
                            ? tableData.tableFooter
                            : Array<string>(tableData.tableHeader.length).fill(
                                "",
                              )
                          )
                            .slice(0, index)
                            .concat(
                              convertSpecialCharactersToCodes(
                                e.target.value.trim(),
                              ),
                              (tableData.tableFooter
                                ? tableData.tableFooter
                                : Array<string>(
                                    tableData.tableHeader.length,
                                  ).fill("")
                              ).slice(index + 1),
                            ),
                        });
                      } else {
                        // checking if footer contains data, if not removing from formValues
                        if (!tableData.tableFooter) return;

                        // generating current tableFooter by replacing data in active cell with an empty string
                        const currentTableFooter = tableData.tableFooter
                          .slice(0, index)
                          .concat("", tableData.tableFooter.slice(index + 1));

                        // if current tableFooter contain no data removing it from tableData object
                        if (
                          currentTableFooter.findIndex(
                            (item) => item.length > 0,
                          ) === -1
                        ) {
                          const { tableFooter, ...newTableData } = tableData;
                          setTableData({
                            ...newTableData,
                          });
                        } else {
                          // if other not empty fields found, updating tableFooter
                          setTableData({
                            ...tableData,
                            tableFooter: currentTableFooter,
                          });
                        }
                      }
                    }}
                    onFocus={() =>
                      setActiveCell({
                        row: undefined,
                        column: index,
                      })
                    }
                    style={
                      activeCell?.column === index
                        ? {
                            ...tableData.tableHeader[index].style,
                            backgroundColor: TableColor,
                          }
                        : tableData.tableHeader[index].style
                    }
                  ></Input>
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </>
    )
  );
}
