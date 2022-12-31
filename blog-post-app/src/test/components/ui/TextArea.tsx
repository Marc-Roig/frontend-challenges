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
        text-md rounded-xl border border-brand-border bg-surface-container p-4 font-light text-brand-text shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-brand-borderFocus focus:ring-offset-2 focus:ring-offset-surface-background
        ${className}`}
      {...props}
    >
      {children}
    </textarea>
  );
}
