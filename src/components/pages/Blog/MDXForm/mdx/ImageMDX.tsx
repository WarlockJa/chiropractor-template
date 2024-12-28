import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import { IGenericImageProps } from "../mdxtypes";
import CustomImageMDX from "../CustomImageMDX";
import ModalImagesViewer from "../../ModalImagesViewer";

export default function ImageMDX(image: IGenericImageProps) {
  return (
    <div className="relative">
      <CustomImageMDX
        image={image}
        className="max-h-screen"
        // TODO check for vestiges
        // className="max-h-[calc(100vh_-_var(--header-height))]"
      />
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
    </div>
  );
}
