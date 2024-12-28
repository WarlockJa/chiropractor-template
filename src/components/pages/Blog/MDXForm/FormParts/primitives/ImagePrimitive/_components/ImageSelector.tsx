"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SelectImages } from "@db/schemaImage";
import { Check, X } from "lucide-react";
import { deleteBlogImageAction } from "../actions/image";
import { useAtomValue, useSetAtom } from "jotai";
import { blogImagesAtom, blogUsedImagesAtom } from "../../../../store/jotai";
import { useAction } from "next-safe-action/hooks";
import { useTranslations } from "next-intl";
// import CustomImage from "@/components/CustomImage";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { IParts_Image } from "../../../../mdxtypes";
import CustomImageMDX from "../../../../CustomImageMDX";

interface IImageSelectorProps {
  images: SelectImages[];
  selectedImage: string | undefined;
  setSelectedImage: (data: Omit<IParts_Image, "type">) => void;
}

export default function ImageSelector({
  images,
  selectedImage,
  setSelectedImage,
}: IImageSelectorProps) {
  const t = useTranslations("Errors");
  const tImage = useTranslations("Image");

  // imageDelete transition hook
  const { execute, status } = useAction(deleteBlogImageAction, {
    onError({ error }) {
      if (error.serverError === "UnauthorisedAccess") {
        toast(t("insufficient_rights_title"), {
          description: t("insufficient_rights_delete_image"),
        });

        return;
      }

      error.serverError &&
        toast(
          <SonnerErrorCard
            title={t("general_error_title")}
            errors={error.serverError}
          />,
        );
    },

    onSuccess({ input }) {
      setImages((prev) =>
        prev.filter((image) => image.imageId !== input.imageId),
      );
    },
  });
  // blog images data
  const setImages = useSetAtom(blogImagesAtom);
  // blog used images data
  const usedImages = useAtomValue(blogUsedImagesAtom);

  return (
    <div className="relative min-h-52 w-full overflow-y-scroll border md:max-w-lg">
      <ul className="flex flex-wrap gap-1">
        {images.map((img) => (
          <li
            key={img.imageId}
            className="border-1 relative aspect-video w-[8.9rem] cursor-pointer rounded shadow-sm transition-all hover:border-secondary-foreground hover:shadow-lg"
            style={
              // stored value is a image name without resoltuion prefix
              // comparing values using slice
              selectedImage === img.name
                ? {
                    borderColor: "lightgreen",
                    borderWidth: "0.25rem",
                    marginBottom: "0",
                  }
                : undefined
            }
            title={
              usedImages.includes(img.imageId) || img.name === selectedImage
                ? "Image is in use and cannot be deleted"
                : "Image is not in use and can be safely deleted"
            }
            // saving image data
            onClick={() => setSelectedImage({ ...img })}
          >
            <Button
              type="button"
              variant={"ghost"}
              className="absolute right-0 top-0 z-30"
              size={"icon"}
              disabled={
                status === "executing" ||
                usedImages.includes(img.imageId) ||
                img.name === selectedImage
              }
              title={
                usedImages.includes(img.imageId) || img.name === selectedImage
                  ? tImage("image_in_use")
                  : tImage("image_delete")
              }
              onClick={(e) => {
                e.stopPropagation();
                execute({ imageId: img.imageId });
              }}
            >
              {usedImages.includes(img.imageId) ||
              img.name === selectedImage ? (
                <Check />
              ) : (
                <X className="text-destructive" />
              )}
            </Button>
            <CustomImageMDX image={img} />
          </li>
        ))}
      </ul>
    </div>
  );
}
