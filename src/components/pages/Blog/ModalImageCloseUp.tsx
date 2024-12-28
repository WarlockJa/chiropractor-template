import { useLayoutEffect, useRef, useState } from "react";
import { env } from "@/lib/env.mjs";
import LoaderSpinner from "@/components/UniversalComponents/LoaderSpinner";
import useMouseCoords from "./MDXForm/hooks/useMouseCoords";

interface ImagePanningData {
  maxX: number;
  maxY: number;
  panX: number;
  panY: number;
  xDecimal: number;
  yDecimal: number;
}

const calculateImagePanning = ({
  x,
  y,
  imgHeight,
  imgWidth,
  activeSlide = 0,
}: {
  x: number;
  y: number;
  imgWidth: number;
  imgHeight: number;
  activeSlide?: number;
}): ImagePanningData => {
  // percentile position of the mouse relative to the screen
  const xDecimal = x / window.innerWidth,
    yDecimal = y / window.innerHeight;

  // offset for multiple slides
  const minX = activeSlide * window.innerWidth;

  // maximum image dimensions
  const maxX = imgWidth - window.innerWidth,
    maxY = imgHeight - window.innerHeight;

  // transformation values
  const panX = maxX * xDecimal * -1 + minX,
    panY = maxY * yDecimal * -1;

  return {
    maxX,
    maxY,
    panX,
    panY,
    xDecimal,
    yDecimal,
  };
};

export default function ModalImageCloseUp({
  clickX,
  clickY,
  imageSrc,
  activeSlide = 0,
}: {
  clickX: number;
  clickY: number;
  imageSrc: string;
  activeSlide?: number;
}) {
  // mouse coordinates
  const { x, y } = useMouseCoords({ clickX, clickY });
  // image ref
  const imgRef = useRef<HTMLImageElement>(null);
  // image panning data
  const [imagePanning, setImagePanning] = useState<ImagePanningData>();
  // image loaded state
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    if (!imgRef.current) return;

    const imagePanningData = calculateImagePanning({
      x,
      y,
      imgWidth: imgRef.current?.offsetWidth,
      imgHeight: imgRef.current?.offsetHeight,
      activeSlide,
    });

    setImagePanning(imagePanningData);
  }, [x, y, loaded]);

  // in production images will be served dynamically from the R2 bucket
  // in development we access R2 via default url
  const isProd = process.env.NODE_ENV === "production";

  return (
    <div
      style={{
        width: `${imgRef.current?.naturalWidth}px`,
        height: `${imgRef.current?.naturalHeight}px`,
        transform: `translate(${imagePanning?.panX}px, ${imagePanning?.panY}px)`,
      }}
      className="fixed inset-0"
    >
      {/* TODO check if img can be replaced with CustomComponentMDX */}
      <img
        ref={imgRef}
        src={
          isProd
            ? `${env.NEXT_PUBLIC_R2_URI}/${imageSrc}`
            : `${env.NEXT_PUBLIC_R2_URI}/default.webp`
        }
        onLoad={() => setLoaded(true)}
      />
      {!loaded && <LoaderSpinner />}
    </div>
  );
}
