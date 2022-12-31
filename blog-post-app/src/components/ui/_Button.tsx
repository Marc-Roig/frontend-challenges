import { cn } from "@/utils/styles";
import type { MergeComponentProps } from "@/utils/types";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  `inline-flex justify-center items-center rounded-lg text-brand-text
  focus:ring-2 focus:ring-brand-borderFocus focus:ring-offset-2 focus:ring-offset-brand-surface-background disabled:opacity-60`,
  {
    variants: {
      variant: {
        default:
          "bg-surface-container border-2 border-brand-border hover:bg-surface-content",
        outline: "border-primary border-2 text-primary font-medium",
        filled:
          "text-white bg-primary hover:bg-primary-light disabled:hover:bg-primary",
        light: "bg-surface-content hover:bg-surface-highlight",
        subtle:
          "disabled:bg-surface-highlight hover:bg-surface-content text-brand-subtleText",
      },
      size: {
        sm: ["text-sm", "py-1", "px-2"],
        md: ["text-md", "py-2.5", "px-5"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ButtonProps = VariantProps<typeof button>;

export function Button({
  children,
  variant,
  size,
  className,
  ...props
}: MergeComponentProps<"button", ButtonProps>): JSX.Element {
  const buttonClasses = button({ variant, size });
  return (
    <button className={cn(buttonClasses, className)} {...props}>
      {children}
    </button>
  );
}
