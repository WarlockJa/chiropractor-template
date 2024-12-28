import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { ChevronsDown, ChevronsUp, Trash2 } from "lucide-react";
import {
  blogImagesAtom,
  blogPartsAtom,
  blogUsedImagesAtom,
  sliceIndexAtom,
} from "../store/jotai";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  getUsedImagesArray,
  lookupTable_InsertElements,
  NoEditPartTypes,
  PartsWithImages,
} from "../LookupTables/lookupTablesMDXParts";
import { deleteBlogPart } from "../lib/deleteBlogPart";
import { insertBlogPart } from "../lib/insertBlogPart";

export default function Divider({ index }: { index: number }) {
  // selected part index
  const [sliceIndex, setSliceIndex] = useAtom(sliceIndexAtom);
  const [parts, setParts] = useAtom(blogPartsAtom);
  const [, setUsedImages] = useAtom(blogUsedImagesAtom);
  const [blogImages] = useAtom(blogImagesAtom);

  return (
    <div className="flex w-full cursor-pointer lg:max-w-screen-lg">
      <Button
        type="button"
        variant={"outline"}
        className="m-auto h-8 flex-1 p-0 xsm:p-2"
        aria-label="Edit element above"
        disabled={
          NoEditPartTypes.includes(parts[index]?.type) ||
          sliceIndex !== undefined
        }
        onClick={() => {
          setSliceIndex(index);
        }}
      >
        <>
          <ChevronsUp />
          <p className="px-2">Edit</p>
          <ChevronsUp />
        </>
      </Button>
      {index > 1 && (
        <Button
          type="button"
          variant={"outline"}
          disabled={sliceIndex !== undefined}
          onClick={() => {
            const newParts = deleteBlogPart({
              index,
              parts,
              setParts,
            });

            // updating used images array if deleted part contained images
            if (newParts && PartsWithImages.includes(parts[index].type)) {
              setUsedImages(
                getUsedImagesArray({ parts: newParts, blogImages }),
              );
            }
          }}
          className="h-8 p-0 text-destructive hover:bg-destructive xsm:p-2"
          aria-label="Delete element above"
        >
          <>
            <ChevronsUp />
            <p className="px-2">
              <Trash2 />
            </p>
            <ChevronsUp />
          </>
        </Button>
      )}
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="m-auto h-8 flex-1 p-0 xsm:p-2"
            disabled={sliceIndex !== undefined}
          >
            <>
              <ChevronsDown />
              <p className="px-2">Insert</p>
              <ChevronsDown />
            </>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto">
            <DrawerHeader>
              <DrawerTitle className="text-center">Pick Element</DrawerTitle>
            </DrawerHeader>
            <div className="flex w-fit max-w-[100vw] gap-4 overflow-x-scroll px-4">
              {lookupTable_InsertElements.map((item) => (
                <Button
                  key={item.type}
                  variant={"ghost"}
                  onClick={() =>
                    insertBlogPart({
                      type: item.type,
                      index,
                      parts,
                      setParts,
                      setSliceIndex,
                    })
                  }
                  className="flex h-36 w-48 flex-col justify-between border"
                >
                  <h2 className="w-40 pb-2 text-center">{item.name}</h2>
                  <div className="flex h-full">
                    <img
                      className="self-center"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
