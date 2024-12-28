"use client";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BetweenHorizontalStart,
  BetweenVerticalStart,
  Bold,
  Italic,
  Strikethrough,
  TableColumnsSplit,
  TableRowsSplit,
  Underline,
} from "lucide-react";
import { ITableMDXPrimitiveProps, TableColor } from "../TableMDXPrimitive";
import {
  IParts_TableMDX_TableData,
  ITableStyle,
  TTableActiveCell,
} from "../../../../mdxtypes";

interface ITableMenu extends ITableMDXPrimitiveProps {
  activeCell: TTableActiveCell;
  setAcitveCell: (newActiveCell: TTableActiveCell) => void;
}

// adding new column to the table
const addColumn = ({
  index,
  tableData,
  setTableData,
}: { index: number } & ITableMDXPrimitiveProps) => {
  if (!tableData) return;
  const newTableData: IParts_TableMDX_TableData = {
    tableCaption: tableData.tableCaption ?? undefined,
    tableHeader: tableData.tableHeader
      .slice(0, index + 1)
      .concat(
        { caption: "", style: { textAlign: "left" } },
        tableData.tableHeader.slice(index + 1),
      ),
    tableBody: tableData.tableBody.map((row) =>
      row.slice(0, index + 1).concat("", row.slice(index + 1)),
    ),
    tableFooter: tableData.tableFooter
      ? tableData.tableFooter
          .slice(0, index + 1)
          .concat("", tableData.tableFooter.slice(index + 1))
      : undefined,
  };

  if (!newTableData.tableFooter) delete newTableData.tableFooter;
  if (!newTableData.tableCaption) delete newTableData.tableCaption;

  setTableData(newTableData);
};

// deleting column from the table
const deleteColumn = ({
  index,
  tableData,
  setTableData,
}: { index: number } & ITableMDXPrimitiveProps) => {
  if (!tableData) return;
  const newTableData: IParts_TableMDX_TableData = {
    tableCaption: tableData.tableCaption ?? undefined,
    tableHeader: tableData.tableHeader
      .slice(0, index)
      .concat(tableData.tableHeader.slice(index + 1)),
    tableBody: tableData.tableBody.map((row) =>
      row.slice(0, index).concat(row.slice(index + 1)),
    ),
    tableFooter: tableData.tableFooter
      ? tableData.tableFooter
          .slice(0, index)
          .concat(tableData.tableFooter.slice(index + 1))
      : undefined,
  };

  if (!newTableData.tableFooter) delete newTableData.tableFooter;
  if (!newTableData.tableCaption) delete newTableData.tableCaption;

  setTableData(newTableData);
};

// adding new row to the table
const addRow = ({
  index,
  tableData,
  setTableData,
}: { index: number | undefined } & ITableMDXPrimitiveProps) => {
  if (!tableData) return;

  const newTableData: IParts_TableMDX_TableData = {
    tableCaption: tableData.tableCaption ?? undefined,
    tableHeader: tableData.tableHeader,
    tableBody:
      index === undefined
        ? tableData.tableBody.concat([
            Array(tableData.tableHeader.length).fill(""),
          ])
        : tableData.tableBody
            .slice(0, index)
            .concat(
              [Array(tableData.tableHeader.length).fill("")],
              tableData.tableBody.slice(index),
            ),
    tableFooter: tableData.tableFooter ?? undefined,
  };

  if (!newTableData.tableFooter) delete newTableData.tableFooter;
  if (!newTableData.tableCaption) delete newTableData.tableCaption;

  setTableData(newTableData);
};

// deleting a row in the table
const deleteRow = ({
  index,
  tableData,
  setTableData,
}: { index: number } & ITableMDXPrimitiveProps) => {
  if (!tableData) return;
  const newTableData: IParts_TableMDX_TableData = {
    tableCaption: tableData.tableCaption ?? undefined,
    tableHeader: tableData.tableHeader,
    tableBody: tableData.tableBody
      .slice(0, index)
      .concat(tableData.tableBody.slice(index + 1)),
    tableFooter: tableData.tableFooter ?? undefined,
  };

  if (!newTableData.tableFooter) delete newTableData.tableFooter;
  if (!newTableData.tableCaption) delete newTableData.tableCaption;

  setTableData(newTableData);
};

// changing bold status
const changeBold = ({
  index,
  tableData,
  setTableData,
}: { index: number } & ITableMDXPrimitiveProps) => {
  if (!tableData) return;

  let newStyle: ITableStyle;
  if (tableData.tableHeader[index].style.fontWeight) {
    let { fontWeight, ...rest } = tableData.tableHeader[index].style;
    newStyle = rest;
  } else {
    newStyle = { ...tableData.tableHeader[index].style, fontWeight: "bold" };
  }

  setTableData({
    ...tableData,
    tableHeader: tableData.tableHeader
      .slice(0, index)
      .concat(
        { ...tableData.tableHeader[index], style: newStyle },
        tableData.tableHeader.slice(index + 1),
      ),
  });
};

// changing italic status
const changeItalic = ({
  index,
  tableData,
  setTableData,
}: { index: number } & ITableMDXPrimitiveProps) => {
  if (!tableData) return;

  let newStyle: ITableStyle;
  if (tableData.tableHeader[index].style.fontStyle) {
    let { fontStyle, ...rest } = tableData.tableHeader[index].style;
    newStyle = rest;
  } else {
    newStyle = { ...tableData.tableHeader[index].style, fontStyle: "italic" };
  }

  setTableData({
    ...tableData,
    tableHeader: tableData.tableHeader
      .slice(0, index)
      .concat(
        { ...tableData.tableHeader[index], style: newStyle },
        tableData.tableHeader.slice(index + 1),
      ),
  });
};

// changing underline status
const changeUnderline = ({
  index,
  tableData,
  setTableData,
}: { index: number } & ITableMDXPrimitiveProps) => {
  if (!tableData) return;

  let newStyle: ITableStyle;
  if (tableData.tableHeader[index].style.textDecoration) {
    newStyle = tableData.tableHeader[index].style.textDecoration.includes(
      "underline",
    )
      ? {
          ...tableData.tableHeader[index].style,
          textDecoration: "line-through",
        }
      : {
          ...tableData.tableHeader[index].style,
          textDecoration: "underline line-through",
        };
  } else {
    newStyle = {
      ...tableData.tableHeader[index].style,
      textDecoration: "underline",
    };
  }

  setTableData({
    ...tableData,
    tableHeader: tableData.tableHeader
      .slice(0, index)
      .concat(
        { ...tableData.tableHeader[index], style: newStyle },
        tableData.tableHeader.slice(index + 1),
      ),
  });
};

// changing line through status
const changeLineThrough = ({
  index,
  tableData,
  setTableData,
}: { index: number } & ITableMDXPrimitiveProps) => {
  if (!tableData) return;

  let newStyle: ITableStyle;
  if (tableData.tableHeader[index].style.textDecoration) {
    newStyle = tableData.tableHeader[index].style.textDecoration.includes(
      "line-through",
    )
      ? {
          ...tableData.tableHeader[index].style,
          textDecoration: "underline",
        }
      : {
          ...tableData.tableHeader[index].style,
          textDecoration: "underline line-through",
        };
  } else {
    newStyle = {
      ...tableData.tableHeader[index].style,
      textDecoration: "line-through",
    };
  }

  setTableData({
    ...tableData,
    tableHeader: tableData.tableHeader
      .slice(0, index)
      .concat(
        { ...tableData.tableHeader[index], style: newStyle },
        tableData.tableHeader.slice(index + 1),
      ),
  });
};

// changing text alignment
const changeTextAlign = ({
  index,
  align,
  tableData,
  setTableData,
}: {
  index: number;
  align: "left" | "center" | "right";
} & ITableMDXPrimitiveProps) => {
  if (!tableData) return;

  setTableData({
    ...tableData,
    tableHeader: tableData.tableHeader.slice(0, index).concat(
      {
        ...tableData.tableHeader[index],
        style: { ...tableData.tableHeader[index].style, textAlign: align },
      },
      tableData.tableHeader.slice(index + 1),
    ),
  });
};

export default function TableMenu({
  activeCell,
  tableData,
  setTableData,
  setAcitveCell,
}: ITableMenu) {
  return tableData ? (
    <div className="flex w-full justify-center rounded-t-lg p-1">
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Bold"
        style={
          activeCell &&
          tableData.tableHeader[activeCell.column].style.fontWeight && {
            backgroundColor: TableColor,
          }
        }
        onClick={() =>
          activeCell &&
          changeBold({ index: activeCell.column, tableData, setTableData })
        }
      >
        <Bold />
      </Button>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Italic"
        style={
          activeCell &&
          tableData.tableHeader[activeCell.column].style.fontStyle && {
            backgroundColor: TableColor,
          }
        }
        onClick={() =>
          activeCell &&
          changeItalic({ index: activeCell.column, tableData, setTableData })
        }
      >
        <Italic />
      </Button>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Underline"
        style={
          activeCell &&
          tableData.tableHeader[
            activeCell.column
          ].style.textDecoration?.includes("underline")
            ? {
                backgroundColor: TableColor,
              }
            : undefined
        }
        onClick={() =>
          activeCell &&
          changeUnderline({
            index: activeCell.column,
            tableData,
            setTableData,
          })
        }
      >
        <Underline />
      </Button>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Line Through"
        style={
          activeCell &&
          tableData.tableHeader[
            activeCell.column
          ].style.textDecoration?.includes("line-through")
            ? {
                backgroundColor: TableColor,
              }
            : undefined
        }
        onClick={() =>
          activeCell &&
          changeLineThrough({
            index: activeCell.column,
            tableData,
            setTableData,
          })
        }
      >
        <Strikethrough />
      </Button>
      <div className="px-2"></div>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Align Left"
        style={
          activeCell &&
          tableData.tableHeader[activeCell.column].style.textAlign === "left"
            ? {
                backgroundColor: TableColor,
              }
            : undefined
        }
        onClick={() =>
          activeCell &&
          changeTextAlign({
            index: activeCell.column,
            align: "left",
            tableData,
            setTableData,
          })
        }
      >
        <AlignLeft />
      </Button>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Align Center"
        style={
          activeCell &&
          tableData.tableHeader[activeCell.column].style.textAlign === "center"
            ? {
                backgroundColor: TableColor,
              }
            : undefined
        }
        onClick={() =>
          activeCell &&
          changeTextAlign({
            index: activeCell.column,
            align: "center",
            tableData,
            setTableData,
          })
        }
      >
        <AlignCenter />
      </Button>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Align Right"
        style={
          activeCell &&
          tableData.tableHeader[activeCell.column].style.textAlign === "right"
            ? {
                backgroundColor: TableColor,
              }
            : undefined
        }
        onClick={() =>
          activeCell &&
          changeTextAlign({
            index: activeCell.column,
            align: "right",
            tableData,
            setTableData,
          })
        }
      >
        <AlignRight />
      </Button>
      <div className="px-2"></div>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Insert Column"
        onClick={() => {
          if (!activeCell) return;
          setAcitveCell({ ...activeCell, column: activeCell.column + 1 });
          addColumn({ index: activeCell.column, tableData, setTableData });
        }}
      >
        <BetweenVerticalStart />
      </Button>
      <Button
        disabled={!activeCell || tableData.tableHeader.length < 2}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Delete Column"
        onClick={() => {
          if (!activeCell) return;
          setAcitveCell({
            ...activeCell,
            column: activeCell.column === 0 ? 0 : activeCell.column - 1,
          });
          deleteColumn({ index: activeCell.column, tableData, setTableData });
        }}
      >
        <TableColumnsSplit />
      </Button>
      <Button
        disabled={!activeCell}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Insert Row"
        onClick={() => {
          if (!activeCell) return;
          setAcitveCell({
            ...activeCell,
            row: activeCell.row !== undefined ? activeCell.row + 1 : 1,
          });
          addRow({ index: activeCell.row, tableData, setTableData });
        }}
      >
        <BetweenHorizontalStart />
      </Button>
      <Button
        disabled={!activeCell || !activeCell.row}
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Delete Row"
        onClick={() => {
          if (!activeCell || activeCell.row === undefined) return;
          setAcitveCell({ ...activeCell, row: activeCell.row - 1 });
          deleteRow({ index: activeCell.row - 1, tableData, setTableData });
        }}
      >
        <TableRowsSplit />
      </Button>
    </div>
  ) : null;
}
