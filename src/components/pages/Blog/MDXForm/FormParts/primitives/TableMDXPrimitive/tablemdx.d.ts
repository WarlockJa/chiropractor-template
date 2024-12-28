import { TTableActiveCell } from "../../../mdxtypes";

interface tableArrowKeysNavigation {
  e: React.KeyboardEvent<HTMLInputElement>;
  tableRef: React.RefObject<HTMLTableElement>;
  activeCell: TTableActiveCell;
}
