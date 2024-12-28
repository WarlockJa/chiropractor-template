/*
arrow navigation function for the mdx chart table element
using mdx chart table ref assigning focus to the corresponding child
in the pseudo matrix of children elements on arrow key event
mdx chart table has the following structure:
root:
[0]head:
  -columns:
    -Input: HTMLInputElement;
[1]body:
  -rows: 
    -columns:
      -Input: HTMLInputElement;
*/

"use client";

import { chartTableArrowKeysNavigation } from "../chartPrimitive";

export default function handleChartTableArrowKeysNavigation({
  activeCell,
  e,
  tableRef,
}: chartTableArrowKeysNavigation) {
  if (!activeCell || !tableRef.current || activeCell.row === undefined) return;

  switch (e.code) {
    case "ArrowRight":
      // cutoff if no table space on the right
      if (
        activeCell.column >=
        tableRef.current.children[0].children[0].childElementCount - 1
      ) {
        break;
      }

      if (activeCell.row > 0) {
        // active cell is in the body child element of the table
        const newActiveCell = tableRef.current?.children[1].children[
          activeCell.row - 1
        ].children[activeCell.column + 1].children[0] as HTMLInputElement;

        // navigating to the next column
        newActiveCell.focus();
      } else {
        // active cell is in the header child element of the table
        const newActiveCell = tableRef.current?.children[0].children[0]
          .children[activeCell.column + 1].children[0] as HTMLInputElement;

        // navigating to the next column
        newActiveCell.focus();
      }
      break;
    case "ArrowLeft":
      if (activeCell.column <= 0) {
        break;
      }

      // finding table child node
      if (activeCell.row > 0) {
        // active cell is in the body child element of the table
        const newActiveCell = tableRef.current?.children[1].children[
          activeCell.row - 1
        ].children[activeCell.column - 1].children[0] as HTMLInputElement;

        // navigating to the next column
        newActiveCell.focus();
      } else {
        // active cell is in the header child element of the table
        const newActiveCell = tableRef.current?.children[0].children[0]
          .children[activeCell.column - 1].children[0] as HTMLInputElement;

        // navigating to the next column
        newActiveCell.focus();
      }
      break;
    case "ArrowUp":
      if (activeCell.row > 0) {
        // finding table child node
        if (activeCell.row > 1) {
          // active cell is in the body child element of the table
          const newActiveCell = tableRef.current?.children[1].children[
            activeCell.row - 2
          ].children[activeCell.column].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        } else {
          // active cell is in the header child element of the table
          const newActiveCell = tableRef.current?.children[0].children[0]
            .children[activeCell.column].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        }
      }
      break;
    case "ArrowDown":
      if (activeCell.row < tableRef.current.children[1].childElementCount) {
        // finding table child node
        if (activeCell.row > 1) {
          // active cell is in the body child element of the table
          const newActiveCell = tableRef.current?.children[1].children[
            activeCell.row
          ].children[activeCell.column].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        } else {
          // active cell is in the header child element of the table
          const newActiveCell = tableRef.current?.children[1].children[
            activeCell.row
          ].children[activeCell.column].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        }
      }
      break;

    default:
      break;
  }
}
