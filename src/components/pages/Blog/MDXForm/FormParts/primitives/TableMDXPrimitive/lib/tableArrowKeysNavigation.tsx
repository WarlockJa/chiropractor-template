/*
arrow navigation function for the mdx table element
using mdx table ref assigning focus to the corresponding child
in the pseudo matrix of children elements on arrow key event
mdx table has the following structure:
root:
[0]caption: Not Used by this function
[1]head:
  -columns:
    -Input: HTMLInputElement;
[2]body:
  -rows: 
    -columns:
      -Input: HTMLInputElement;
[3]footer:
  -columns:
    -Input: HTMLInputElement;
*/

"use client";

import { tableArrowKeysNavigation } from "../tablemdx";

export default function handleTableArrowKeysNavigation({
  activeCell,
  e,
  tableRef,
}: tableArrowKeysNavigation) {
  if (!activeCell || !tableRef.current) return;

  switch (e.code) {
    case "ArrowRight":
      // cutoff if no table space on the right
      if (
        activeCell.column >=
        tableRef.current.children[1].children[0].childElementCount - 1
      ) {
        break;
      }

      // finding table child node
      if (activeCell.row === undefined) {
        // active cell is in the footer child element of the table
        const newActiveCell = tableRef.current?.children[3].children[0]
          .children[activeCell.column + 1].children[0] as HTMLInputElement;

        // navigating to the next column
        newActiveCell.focus();
      } else {
        if (activeCell.row > 0) {
          // active cell is in the body child element of the table
          const newActiveCell = tableRef.current?.children[2].children[
            activeCell.row - 1
          ].children[activeCell.column + 1].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        } else {
          // active cell is in the header child element of the table
          const newActiveCell = tableRef.current?.children[1].children[0]
            .children[activeCell.column + 1].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        }
      }
      break;
    case "ArrowLeft":
      if (activeCell.column <= 0) {
        break;
      }

      if (activeCell.row === undefined) {
        // active cell is in the body child element of the table
        const newActiveCell = tableRef.current?.children[3].children[0]
          .children[activeCell.column - 1].children[0] as HTMLInputElement;

        // navigating to the next column
        newActiveCell.focus();
      } else {
        // finding table child node
        if (activeCell.row > 0) {
          // active cell is in the body child element of the table
          const newActiveCell = tableRef.current?.children[2].children[
            activeCell.row - 1
          ].children[activeCell.column - 1].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        } else {
          // active cell is in the header child element of the table
          const newActiveCell = tableRef.current?.children[1].children[0]
            .children[activeCell.column - 1].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        }
      }
      break;
    case "ArrowUp":
      if (activeCell.row === undefined) {
        const lastBodyIndex =
          tableRef.current?.children[2].childElementCount - 1;
        // active cell is in the body child element of the table
        const newActiveCell = tableRef.current?.children[2].children[
          lastBodyIndex
        ].children[activeCell.column].children[0] as HTMLInputElement;

        // navigating to the next column
        newActiveCell.focus();
      } else {
        if (activeCell.row > 0) {
          // finding table child node
          if (activeCell.row > 1) {
            // active cell is in the body child element of the table
            const newActiveCell = tableRef.current?.children[2].children[
              activeCell.row - 2
            ].children[activeCell.column].children[0] as HTMLInputElement;

            // navigating to the next column
            newActiveCell.focus();
          } else {
            // active cell is in the header child element of the table
            const newActiveCell = tableRef.current?.children[1].children[0]
              .children[activeCell.column].children[0] as HTMLInputElement;

            // navigating to the next column
            newActiveCell.focus();
          }
        }
      }
      break;
    case "ArrowDown":
      if (activeCell.row === undefined) break;

      if (activeCell.row < tableRef.current.children[2].childElementCount) {
        // finding table child node
        if (activeCell.row > 1) {
          // active cell is in the body child element of the table
          const newActiveCell = tableRef.current?.children[2].children[
            activeCell.row
          ].children[activeCell.column].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        } else {
          // active cell is in the header child element of the table
          const newActiveCell = tableRef.current?.children[2].children[
            activeCell.row
          ].children[activeCell.column].children[0] as HTMLInputElement;

          // navigating to the next column
          newActiveCell.focus();
        }
      } else {
        // active cell is on the last row of the body child element of the table
        const newActiveCell = tableRef.current?.children[3].children[0]
          .children[activeCell.column].children[0] as HTMLInputElement;

        // navigating to the next column
        newActiveCell.focus();
      }
      break;

    default:
      break;
  }
}
