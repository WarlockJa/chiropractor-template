import { useEffect, useState } from "react";
import throttle from "./throttle";

export default function useMouseCoords({
  clickX = 0,
  clickY = 0,
}: {
  clickX?: number;
  clickY?: number;
}) {
  const [mouseCoords, setMouseCoords] = useState({ x: clickX, y: clickY });

  useEffect(() => {
    // throttling mousemove event
    const updateCursorPosition = throttle((e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    }, 10);

    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return mouseCoords;
}
