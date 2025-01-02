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
import { convertCodesToSpecialCharacters } from "@/lib/convertStringSpecialCharacters";
import { IParts_TableMDX_TableData } from "../mdxtypes";

// style={{fontStyle: "italic", fontWeight: "bold", textDecoration: "underline line-through", textAlign: "center"}}

export default function TableMDX({
  tableData,
}: {
  tableData: string | undefined;
}) {
  let data = undefined;
  try {
    if (tableData) {
      data = JSON.parse(tableData) as IParts_TableMDX_TableData;
    }
  } catch (error) {}

  return data ? (
    <Table>
      {data.tableCaption && (
        <TableCaption className="font-semibold text-foreground">
          {convertCodesToSpecialCharacters(data.tableCaption)}
        </TableCaption>
      )}
      <TableHeader>
        <TableRow>
          {data.tableHeader.map((headerItem, index) => (
            <TableHead
              key={headerItem.caption.concat(index.toString())}
              style={headerItem.style}
              className="font-semibold text-foreground"
            >
              {convertCodesToSpecialCharacters(headerItem.caption)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.tableBody.map((bodyRow, rowIndex) => (
          <TableRow key={rowIndex}>
            {bodyRow.map((bodyCell, columnIndex) => (
              <TableCell
                key={bodyCell.concat(
                  rowIndex.toString(),
                  columnIndex.toString(),
                )}
                style={data.tableHeader[columnIndex].style}
              >
                {convertCodesToSpecialCharacters(bodyCell)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {data.tableFooter && (
        <TableFooter>
          <TableRow>
            {data.tableFooter.map((item, index) => (
              <TableCell
                key={`tableFooter${index}`}
                style={data.tableHeader[index].style}
                className="font-semibold text-foreground"
              >
                {convertCodesToSpecialCharacters(item)}
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  ) : null;
}
