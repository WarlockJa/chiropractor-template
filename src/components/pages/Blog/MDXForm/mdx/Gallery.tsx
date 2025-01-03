import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TPartImageId } from "../mdxtypes";
import ModalImagesViewer from "../../ModalImagesViewer";
import CustomImageMDX from "../CustomImageMDX";

export default function Gallery({ imageIds }: { imageIds: string }) {
  // slides state
  const [data] = useState<TPartImageId[]>(() => JSON.parse(imageIds));

  return data ? (
    <Card className="mb-8 shadow-lg">
      <CardContent className="grid grid-cols-1 gap-1 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((imageId, index) => (
          <div key={`${imageId}${index}`}>
            <ModalImagesViewer imageIds={data} activeImageIndex={index}>
              <Button
                type="button"
                variant={"ghost"}
                className="h-full w-full border-2 p-0 contrast-100 transition-all hover:scale-105 hover:shadow-xl hover:contrast-125"
              >
                <CustomImageMDX imageId={imageId} className="h-40 max-h-40" />
              </Button>
            </ModalImagesViewer>
          </div>
        ))}
      </CardContent>
    </Card>
  ) : null;
}
