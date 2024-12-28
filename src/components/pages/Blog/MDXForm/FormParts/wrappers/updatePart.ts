import { TAllBlogParts, TParts } from "../../mdxtypes";

interface IUpdatePartProps {
  formValues: TAllBlogParts;
  parts: TParts;
  setParts: (newParts: TParts) => void;
  sliceIndex: number | undefined;
  setSliceIndex: (newSliceIndex: number | undefined) => void;
}

// updates part object inside TParts array with the data from a FormPart component
export default function updatePart({
  formValues,
  parts,
  setParts,
  setSliceIndex,
  sliceIndex,
}: IUpdatePartProps) {
  if (sliceIndex === undefined) return;

  // assembling updated parts array
  const newParts = parts.slice(0, sliceIndex).concat(
    {
      ...formValues,
    },
    parts.slice(sliceIndex + 1),
  ) as TParts;

  setParts(newParts);
  setSliceIndex(undefined);

  return newParts;
}
