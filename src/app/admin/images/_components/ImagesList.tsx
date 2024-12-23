import { defaultBlurhash } from "@/appConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { getCachedImages } from "@/lib/cache/getCachedImages";
import { env } from "@/lib/env.mjs";
import Image from "next/image";
import DeleteImageForm from "./DeleteImageForm";

export default async function ImagesList() {
  const imagesDB = await getCachedImages();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-2">
        {imagesDB.map((img) => (
          <Card key={img.imageId}>
            <CardHeader>
              <CardTitle>{img.name}</CardTitle>
              <CardDescription>{img.aria}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
              <Image
                src={`${env.NEXT_PUBLIC_R2_URI}/${img.name}`}
                // TODO translate alt and aria
                alt={img.aria}
                aria-label={img.aria}
                width={img.width}
                height={img.height}
                placeholder="blur"
                blurDataURL={blurHashToDataURL(img.blurhash ?? defaultBlurhash)}
                className={"h-full w-full flex-1 object-contain"}
                sizes="100vw"
              />
              <DeleteImageForm {...img} />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
