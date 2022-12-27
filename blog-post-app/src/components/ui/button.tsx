import { cn } from "@/utils/styles";
import type { MergeComponentProps } from "@/utils/types";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  `inline-flex justify-center items-center rounded-lg text-brand-text1
  focus:ring-2 focus:ring-brand-borderFocus focus:ring-offset-2 focus:ring-offset-brand-surface1 disabled:opacity-60`,
  {
    variants: {
      variant: {
        default:
          "bg-brand-surface2 border-2 border-brand-border hover:bg-brand-surface3",
        outline: "border-brand-primary border-2 text-brand-primary font-medium",
        filled:
          "text-white bg-brand-primary hover:bg-brand-primaryLight disabled:hover:bg-brand-primary",
        light: "bg-brand-surface3 hover:bg-brand-surface4",
        subtle:
          "disabled:bg-brand-surface4 hover:bg-brand-surface3 text-brand-text2",
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