import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IGenericImageProps } from "../mdxtypes";
import ModalImagesViewer from "../../ModalImagesViewer";
import CustomImageMDX from "../CustomImageMDX";

export default function Gallery({ images }: { images: string | undefined }) {
  // slides state
  const [data] = useState<IGenericImageProps[] | undefined>(() => {
    try {
      if (images) {
        return JSON.parse(images) as IGenericImageProps[];
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  });

  return data ? (
    <Card className="mb-8 shadow-lg">
      <CardContent className="grid grid-cols-4 gap-1 p-2">
        {data.map((img, index) => (
          <div key={img.name.concat(index.toString())}>
            <ModalImagesViewer images={data} activeImageIndex={index}>
              <Button
                type="button"
                variant={"ghost"}
                className="h-full w-full border-2 p-0 contrast-100 transition-all hover:scale-105 hover:shadow-xl hover:contrast-125"
              >
                <CustomImageMDX image={img} className="h-40 max-h-40" />
              </Button>
            </ModalImagesViewer>
          </div>
        ))}
      </CardContent>
    </Card>
  ) : null;
}
