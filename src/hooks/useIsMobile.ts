import { useEffect, useState } from "react";

function testMobileFunction() {
  // Check for touch support
  return "ontouchstart" in window;
}

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(testMobileFunction());
  }, []);

  return isMobile;
}
