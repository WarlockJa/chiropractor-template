"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { deleteBlogImageAction } from "../actions/image";
import { useAtom, useAtomValue } from "jotai";
import { blogImagesAtom, blogUsedImagesAtom } from "../../../../store/jotai";
import { useAction } from "next-safe-action/hooks";
import { useTranslations } from "next-intl";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { IGenericImageProps, TPartImageId } from "../../../../mdxtypes";
import CustomImageMDX from "../../../../CustomImageMDX";

interface IImageSelectorProps {
  selectedImage: TPartImageId;
  setSelectedImage: ({ imageId }: Pick<IGenericImageProps, "imageId">) => void;
}

export default function ImageSelector({
  selectedImage,
  setSelectedImage,
}: IImageSelectorProps) {
  const tErrors = useTranslations("Errors");
  const tBlogImage = useTranslations("Blog.ImagePart");

  // imageDelete transition hook
  const { execute, status } = useAction(deleteBlogImageAction, {
    onError({ error }) {
      if (error.serverError === "UnauthorisedAccess") {
        toast(tErrors("insufficient_rights_title"), {
          description: tErrors("insufficient_rights_delete_image"),
        });

        return;
      }

      error.serverError &&
        toast(
          <SonnerErrorCard
            title={tErrors("general_error_title")}
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
  const [images, setImages] = useAtom(blogImagesAtom);
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
              selectedImage === img.imageId
                ? {
                    borderColor: "lightgreen",
                    borderWidth: "0.25rem",
                    marginBottom: "0",
                  }
                : undefined
            }
            title={
              usedImages.includes(img.imageId) || img.imageId === selectedImage
                ? tBlogImage("image_in_use_description")
                : tBlogImage("image_delete_description")
            }
            // saving image data
            onClick={() => setSelectedImage({ imageId: img.imageId })}
          >
            <Button
              type="button"
              variant={"ghost"}
              className="absolute right-0 top-0 z-10"
              size={"icon"}
              disabled={
                status === "executing" ||
                usedImages.includes(img.imageId) ||
                img.imageId === selectedImage
              }
              title={
                usedImages.includes(img.imageId) ||
                img.imageId === selectedImage
                  ? tBlogImage("image_in_use")
                  : tBlogImage("image_delete")
              }
              onClick={(e) => {
                e.stopPropagation();
                execute({ imageId: img.imageId });
              }}
            >
              {usedImages.includes(img.imageId) ||
              img.imageId === selectedImage ? (
                <Check />
              ) : (
                <X className="text-destructive" />
              )}
            </Button>
            <CustomImageMDX imageId={img.imageId} />
          </li>
        ))}
      </ul>
    </div>
  );
}
