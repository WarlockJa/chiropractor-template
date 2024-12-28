import { TParts } from "../mdxtypes";

// this function deletes a part from parts array
export const deleteBlogPart = ({
  index,
  parts,
  setParts,
}: {
  index: number;
  parts: TParts;
  setParts: (newParts: TParts) => void;
}) => {
  // dividing parts based on index of insertion
  const newPart_Slice1 = parts.slice(0, index);
  // adjusting indexes for the second slice dividers and adjusting indexes in dividers
  const newPart_Slice2 = parts
    .slice(index + 2)
    .map((part) =>
      part.type === 999 ? { ...part, index: part.index - 2 } : part,
    );

  // returning combined newParts array
  const newParts = newPart_Slice1.concat(newPart_Slice2) as TParts;
  setParts(newParts);

  return newParts;
};
