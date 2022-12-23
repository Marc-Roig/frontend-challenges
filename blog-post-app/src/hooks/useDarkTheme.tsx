import { useEffect, useState } from "react";

function getPreferredColorScheme() {
  if (typeof window !== "undefined") {
    return (
      localStorage.theme ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
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
