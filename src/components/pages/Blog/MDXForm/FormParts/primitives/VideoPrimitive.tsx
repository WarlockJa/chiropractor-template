import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { alphanumericWithDashUnderscore } from "@/lib/regex";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";

interface IVideoPrimitiveProps {
  labelText: string;
  placeholderText: string;
  videoId: string;
  setVideoId: (text: string) => void;
}

const videoIdSchema = z
  .string()
  .length(11)
  .regex(alphanumericWithDashUnderscore);

const getYTVideoIdFromURI = ({ url }: { url: string }): string | undefined => {
  const videoIdIndex = url.lastIndexOf("watch?v=");
  const videoId = videoIdSchema.safeParse(
    url.slice(videoIdIndex + 8, videoIdIndex + 19),
  );
  return videoId.success ? videoId.data : undefined;
};

export default function VideoPrimitive({
  labelText,
  placeholderText,
  videoId,
  setVideoId,
}: IVideoPrimitiveProps) {
  const tBlogVideo = useTranslations("Blog.VideoPart");
  const [uriString, setUriString] = useState("");
  return (
    <div className="p-4">
      <Label htmlFor="videoPrimitive">{labelText}</Label>
      <Input
        id="videoPrimitive"
        placeholder={placeholderText}
        value={uriString}
        onChange={(e) => {
          setUriString(e.target.value);
          const videoId = getYTVideoIdFromURI({ url: e.target.value });
          videoId && setVideoId(videoId);
        }}
        maxLength={100}
        required
      />
      <Label>
        {tBlogVideo("primitive_label")} {videoId}
      </Label>
    </div>
  );
}
