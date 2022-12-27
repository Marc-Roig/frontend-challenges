import { useEffect, useState } from "react";

function getPreferredColorScheme() {
  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const prefersTheme = prefersDark ? "dark" : "light";
    return localStorage.theme ? localStorage.theme : prefersTheme;
  }
  return "dark";
}

export default function useDarkTheme() {
  const [theme, setTheme] = useState(getPreferredColorScheme());
  const colorTheme = theme === "dark" ? "light" : "dark";
  const switchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    // Save theme to Local Storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return { theme, setTheme, switchTheme };
}
