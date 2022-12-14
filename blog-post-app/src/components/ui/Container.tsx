import type { MergeComponentProps } from "@/utils/types";

export function Container({
  children,
  className,
  ...props
}: MergeComponentProps<"div", { className?: string }>) {
  return (
    <div
      {...props}
      className={`container max-w-4xl px-7 sm:px-14 ${className}`}
    >
      {children}
    </div>
  );
}
