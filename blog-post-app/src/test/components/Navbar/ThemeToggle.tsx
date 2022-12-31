import { useHasHydrated } from "@/hooks/useHasHydrated";
import type { MergeComponentProps } from "@/utils/types";
import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle({
  colorTheme,
  ...props
}: MergeComponentProps<"div", { colorTheme: string }>) {
  // Next gives an hydration error when rendering the theme toggle
  // Because of that, we need to check if the component is hydrated first
  const hasHydrated = useHasHydrated();

  return (
    <div className="flex rounded-lg p-2 hover:bg-surface-highlight" {...props}>
      {colorTheme === "light"
        ? hasHydrated && <FiMoon size={"1.25rem"} />
        : hasHydrated && <FiSun size={"1.25rem"} />}
    </div>
  );
}

export default ThemeToggle;
