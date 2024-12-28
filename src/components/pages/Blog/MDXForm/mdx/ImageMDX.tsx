import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import CustomImageMDX from "../CustomImageMDX";
import ModalImagesViewer from "../../ModalImagesViewer";
import { TPartImageId } from "../mdxtypes";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { blogImagesAtom } from "../store/jotai";

export default function ImageMDX({ imageId }: { imageId: TPartImageId }) {
  const blogImages = useAtomValue(blogImagesAtom);
  const image = useMemo(
    () => blogImages.find((item) => item.imageId === imageId),
    [imageId],
  );
  return (
    <div className="relative">
      <CustomImageMDX
        image={image}
        className="max-h-screen"
        // TODO check for vestiges
        // className="max-h-[calc(100vh_-_var(--header-height))]"
      />
      {image && (
        <ModalImagesViewer images={[image]}>
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="absolute bottom-1 right-1"
            title="Fullscreen"
          >
            <Maximize />
          </Button>
        </ModalImagesViewer>
      )}
    </div>
  );
}
