import { useEffect, useRef, useState } from "react";

export default function useIsPinned<T extends HTMLElement>() {
  const [isPinned, setIsPinned] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    function changeColor() {
      if (!ref.current) return;

      if (window.scrollY >= ref.current.offsetHeight) {
        setIsPinned(true);
      } else {
        setIsPinned(false);
      }
    }
    window.addEventListener("scroll", changeColor);
    return () => window.removeEventListener("scroll", changeColor);
  }, [ref]);

  return { isPinned, ref };
}
