import useThemeStore from "@/stores/useThemeStore";
import { useLayoutEffect, useEffect } from "react";
// import { useHasHydrated } from "./useHasHydrated";

// useLayoutEffect does not have any effect on the server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useTheme = () => {
  // const hasHydrated = useHasHydrated();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useIsomorphicLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
  }, [theme]);

  // if (!hasHydrated) return { theme: "dark", toggleTheme };
  return { theme, toggleTheme };
};
