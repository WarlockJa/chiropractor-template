import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  blogImagesAtom,
  blogPartsAtom,
  blogUsedImagesAtom,
  sliceIndexAtom,
} from "../../store/jotai";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import updatePart from "./updatePart";
import { deleteBlogPart } from "../../lib/deleteBlogPart";
import {
  getUsedImagesArray,
  lookupTable_Parts,
  PartsWithImages,
} from "../../LookupTables/lookupTablesMDXParts";
import isDeepEqual from "@/lib/isDeepEqual";
import { TAllBlogParts } from "../../mdxtypes";
import { useTranslations } from "next-intl";

// creating context to wrap any children Part
const PartWrapperContext = createContext<{
  formValues: IFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<IFormValues>>;
} | null>(null);

export default function PartWrapper({
  props,
  children,
  editFlag,
}: {
  props: TAllBlogParts;
  children: ReactNode;
  editFlag: boolean;
}) {
  const tBlog = useTranslations("Blog");
  // currently edited MDX part index
  const [sliceIndex, setSliceIndex] = useAtom(sliceIndexAtom);
  // MDX parts data
  const [parts, setParts] = useAtom(blogPartsAtom);
  // used images data
  const setUsedImages = useSetAtom(blogUsedImagesAtom);
  // blog images data
  const blogImages = useAtomValue(blogImagesAtom);
  // local hero part data
  const [formValues, setFormValues] = useState<IFormValues>({
    currentValues: structuredClone(props),
    originalState: props,
    isOkToSave: false,
    noErrors: true,
  });

  useEffect(() => {
    if (!editFlag) setSliceIndex(undefined);
  }, [editFlag]);

  return (
    <div className="my-4 rounded-xl border-4 shadow-md">
      <PartWrapperContext.Provider value={{ formValues, setFormValues }}>
        {children}
      </PartWrapperContext.Provider>
      <div className="flex w-full">
        <Button
          variant={"default"}
          disabled={!formValues.isOkToSave || !formValues.noErrors}
          onClick={() => {
            const newParts = updatePart({
              formValues: formValues.currentValues,
              parts,
              setParts,
              sliceIndex,
              setSliceIndex,
            });

            // console.log(newParts);

            // updating used images array if edited part contains images
            if (
              sliceIndex !== undefined &&
              newParts &&
              PartsWithImages.includes(newParts[sliceIndex].type)
            ) {
              setUsedImages(
                getUsedImagesArray({ parts: newParts, blogImages }),
              );
            }
          }}
          className="flex-1"
          type="button"
        >
          {tBlog("save")}
        </Button>
        <Button
          className="flex-1"
          type="button"
          onClick={() => {
            sliceIndex &&
              isDeepEqual(
                lookupTable_Parts.find(
                  (part) => part.type === formValues.currentValues.type,
                ),
                formValues.originalState,
              ) &&
              deleteBlogPart({
                index: sliceIndex,
                parts,
                setParts,
              });
            setSliceIndex(undefined);
          }}
          variant={"outline"}
        >
          {tBlog("cancel")}
        </Button>
      </div>
    </div>
  );
}

// exporting usePartWrapperContext with a check for context existence
export function usePartWrapperContext() {
  const context = useContext(PartWrapperContext);

  if (!context)
    throw new Error("usePartWrapperContext must be inside PartWrapperProvider");

  return context;
}
