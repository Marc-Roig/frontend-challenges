import type { MergeComponentProps } from "@/utils/types";
import React from "react";

interface TextAreaProps {
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
        surface-container text-md rounded-xl border border-brand-border p-4 font-light shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-brand-borderFocus focus:ring-offset-2 focus:ring-offset-surface-background
        ${className}`}
      {...props}
    >
      {children}
    </textarea>
  );
}
