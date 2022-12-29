import type { MergeComponentProps } from "@/utils/types";
import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle({
  colorTheme,
  ...props
}: MergeComponentProps<"div", { colorTheme: string }>) {
  console.log(colorTheme);

  return (
    <div className="flex rounded-lg p-2 hover:bg-surface-highlight" {...props}>
      {colorTheme === "light" ? (
        <FiMoon size={"1.25rem"} />
      ) : (
        <FiSun size={"1.25rem"} />
      )}
    </div>
  );
}

export default ThemeToggle;
