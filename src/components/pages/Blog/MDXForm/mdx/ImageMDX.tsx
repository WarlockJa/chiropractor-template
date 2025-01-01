import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import CustomImageMDX from "../CustomImageMDX";
import ModalImagesViewer from "../../ModalImagesViewer";
import { TPartImageId } from "../mdxtypes";

export default function ImageMDX({ imageId }: { imageId: TPartImageId }) {
  return (
    <div className="relative">
      <CustomImageMDX imageId={imageId} className="max-h-screen" />
      {imageId && (
        <ModalImagesViewer imageIds={[imageId]}>
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
