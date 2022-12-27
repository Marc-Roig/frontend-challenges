import type { MergeComponentProps } from "@/utils/types";
import React from "react";

interface TextAreaProps {
  className?: string;
  value?: string;
}

export function TextArea({
  children,
  className,
  value = "",
  ...props
}: MergeComponentProps<"textarea", TextAreaProps>): JSX.Element {
  return (
    <textarea
      value={value}
      className={`
        surface2 text-md rounded-xl border border-brand-border p-4 font-light shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-brand-borderFocus 
        focus:ring-offset-2 focus:ring-offset-brand-surface1
        ${className}`}
      {...props}
    >
      {children}
    </textarea>
  );
}
