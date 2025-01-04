"use client";

import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { addImageAction } from "./_actions/actions";
import { useEffect, useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import { MAX_FILE_SIZE } from "@/appConfig";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";

export default function AddImageForm() {
  // TODO add translations
  const tErrors = useTranslations("Errors");

  const { execute, status } = useAction(addImageAction, {
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(tErrors("rate_limit_title"), {
          description: tErrors("rate_limit_description"),
        });

        return;
      }

      error.serverError &&
        toast(<SonnerErrorCard title={"Error"} errors={error.serverError} />);

      toast(<SonnerErrorCard title={"Error"} errors={JSON.stringify(error)} />);
    },

    onSuccess({ data }) {
      toast("Added New Image:", {
        description: JSON.stringify(data),
      });

      setFile(undefined);
    },
  });

  // image file data
  const [file, setFile] = useState<FileUploadItem>();

  // input file ref
  const inputRef = useRef<HTMLInputElement>(null);

  // testing file as image
  // getting height, width
  useEffect(() => {
    if (!file || !file.file) return;
    const img = new Image();

    img.src = window.URL.createObjectURL(file.file);

    img.onload = () =>
      setFile({
        file: file.file,
        status: "success",
        height: img.height,
        width: img.width,
        aria: file.aria,
      });
    img.onerror = () =>
      setFile({ file: file.file, status: "error", aria: file?.aria ?? "" });
  }, [file?.file]);

  return (
    <Card className="transition-shadow hover:shadow hover:shadow-foreground">
      <CardContent className="mt-6">
        {/* Drag and Drop area combined with file selector and URL parser */}
        <div
          className="w-full rounded border-2 border-dashed border-muted"
          onDrop={(event) => {
            event.preventDefault();
            // uploading images
            setFile({
              file: [...event.dataTransfer.files][0],
              status: "pending",
              aria: file?.aria ?? "",
            });
          }}
          onDragOver={(event) => event.preventDefault()}
        >
          <div
            className="m-2 max-h-60 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            {file?.file ? (
              <div className="mx-auto h-60 w-60">
                <img
                  src={window.URL.createObjectURL(file.file)}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <>
                <CloudUpload
                  className={cn(
                    "mx-auto h-24 w-24 text-blue-400",
                    status === "executing" && "animate-spin",
                  )}
                  // style={filesRef.current ? { color: "green" } : undefined}
                />
                <div
                  className="text-lg text-blue-400"
                  // style={filesRef.current ? { color: "green" } : undefined}
                >
                  <p className="text-center">Drag and Drop Image Files</p>
                  <p className="text-center">
                    Or Click to Select Images on Your PC
                  </p>

                  <p className="text-center">
                    File size limit {Math.floor(MAX_FILE_SIZE / 1000000)}MB
                  </p>
                </div>
              </>
            )}
          </div>
          {/* Hidden input used to select files from user's PC */}
          <input
            disabled={status === "executing"}
            type="file"
            className="hidden"
            ref={inputRef}
            accept="image/*"
            onChange={(event) => {
              if (!event.target.files) return;
              // uploading images
              setFile({
                file: [...event.target.files][0],
                status: "pending",
                aria: file?.aria ?? "",
              });
            }}
          />
        </div>
        <Input
          disabled={!Boolean(file?.file)}
          type="text"
          placeholder="Service aria label"
          max={100}
          min={1}
          value={file?.aria}
          onChange={(e) => file && setFile({ ...file, aria: e.target.value })}
        />
        <LoaderButton
          type="button"
          isDisabled={status === "executing"}
          isLoading={status === "executing"}
          className="w-full hover:bg-accent hover:text-primary"
          onClick={() => {
            if (!file?.file || !file.height || !file.width || !file.aria)
              return;

            const formData = new FormData();
            formData.append("imageFile", file.file);
            formData.append("aria", file.aria);
            formData.append("width", file.width.toString());
            formData.append("height", file.height.toString());

            execute(formData);
          }}
        >
          Upload Image
        </LoaderButton>
      </CardContent>
    </Card>
  );
}
