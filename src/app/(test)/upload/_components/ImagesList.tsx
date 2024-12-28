"use client";
import { Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { deleteLocalR2Object } from "../_actions/localR2";

export default function ImagesList({ keysList }: { keysList: string[] }) {
  const [imgSrc, setImgSrc] = useState<
    { key: string; src: string | undefined } | undefined
  >();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!imgSrc?.key) return;

    fetch("/api/local/r2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: imgSrc.key }),
    })
      .then((response) => response.blob())
      .then((imageBlob) =>
        setImgSrc({ src: URL.createObjectURL(imageBlob), key: imgSrc.key }),
      );
  }, [imgSrc?.key]);

  return (
    <>
      {imgSrc?.src && <img src={imgSrc.src} alt="Image placeholder" />}
      <ul>
        {keysList.length > 0 ? (
          keysList.map((file) => (
            <li
              key={file}
              className="flex cursor-pointer gap-2"
              style={isPending ? { opacity: 0.5 } : undefined}
            >
              <Trash2
                onClick={() => {
                  startTransition(async () => {
                    await deleteLocalR2Object({ key: file });
                  });
                }}
              />
              <p
                onClick={() =>
                  !isPending && setImgSrc({ src: imgSrc?.src, key: file })
                }
              >
                {file}
              </p>
            </li>
          ))
        ) : (
          <p>No files found</p>
        )}
      </ul>
    </>
  );
}
