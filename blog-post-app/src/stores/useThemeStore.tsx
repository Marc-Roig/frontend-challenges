import create from "zustand";
import { persist } from "zustand/middleware";

function getPreferredColorScheme() {
  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  }
  return "dark";
}

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: getPreferredColorScheme(),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme",
    }
  )
);

export default useThemeStore;
