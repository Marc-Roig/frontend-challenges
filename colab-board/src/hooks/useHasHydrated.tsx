import { useEffect, useState } from "react";

// https://github.com/pmndrs/zustand/issues/324#issuecomment-799215374
export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
