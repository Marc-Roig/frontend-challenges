import { useEffect, useState } from "react";

export default function useIsPinned(ref: React.RefObject<HTMLElement>) {
  const [isPinned, setIsPinned] = useState(false);

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

  return { isPinned };
}
