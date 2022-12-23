import type { MergeComponentProps } from "@/utils/types";

export function Button({
  children,
  className,
  ...props
}: MergeComponentProps<"button", { className?: string }>): JSX.Element {
  return (
    <button
      className={`
        text-bold inline-flex items-center justify-center rounded-lg bg-brand-primary px-5 py-2.5 text-center text-sm 
        text-white hover:bg-brand-primaryLight
        focus:ring-2 focus:ring-brand-borderFocus focus:ring-offset-2 focus:ring-offset-brand-surface1
        disabled:opacity-60 disabled:hover:bg-brand-primary
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
