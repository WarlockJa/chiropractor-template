import {
  lookupTable_Parts,
  NoEditPartTypes,
} from "../LookupTables/lookupTablesMDXParts";
import { TParts } from "../mdxtypes";

// this function inserts a new part into parts array
export const insertBlogPart = ({
  type,
  index,
  parts,
  setParts,
  setSliceIndex,
}: {
  type: number;
  index: number;
  parts: TParts;
  setParts: (newParts: TParts) => void;
  setSliceIndex: (newIndex: number) => void;
}) => {
  // finding part to insert based on type
  const insertPart = lookupTable_Parts.find((item) => item.type === type);
  if (!insertPart) return;

  // dividing parts based on index of insertion
  const newPart_Slice1 = parts.slice(0, index + 2);
  // adjusting indexes for the second slice dividers
  const newPart_Slice2 = parts
    .slice(index + 2)
    .map((part) =>
      part.type !== 999 ? part : { ...part, index: part.index + 2 },
    );

  // combining new parts
  const combinedNewParts = newPart_Slice1.concat(
    insertPart,
    { type: 999, index: index + 2 },
    newPart_Slice2,
  ) as TParts;

  // returning combined newParts array
  setParts(combinedNewParts);

  // forsing edit state on a newly inserted part if editable
  if (!NoEditPartTypes.includes(combinedNewParts[index + 2].type))
    setSliceIndex(index + 2);
};
