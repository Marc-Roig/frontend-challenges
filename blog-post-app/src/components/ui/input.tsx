import type { MergeComponentProps } from "@/utils/types";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/styles";

const input = cva(
  `text-md rounded-xl text-brand-text shadow-sm placeholder:text-brand-subtleText
  focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-background `,
  {
    variants: {
      variant: {
        default: "border border-brand-border bg-surface-content",
        outline: "",
        filled: "",
        light: "",
      },
      status: {
        default: "",
        error:
          "border-error text-error placeholder:text-error focus:ring-error",
      },
      size: {
        sm: ["text-sm", "font-light", "py-1", "px-2"],
        md: ["text-md", "font-light", "py-2", "px-4"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "default",
      size: "md",
      status: "default",
    },
  }
);

export type InputProps = VariantProps<typeof input> & {
  label?: string;
  error?: string;
};

/**
 * Input component with variants:
 *  - variant: default, outline, filled, light
 *  - size: sm, md
 *  - status: default, error
 *
 */
// eslint-disable-next-line react/display-name
const Input = forwardRef<
  HTMLInputElement,
  MergeComponentProps<"input", InputProps>
>(({ label, error, variant, size, ...props }, ref) => {
  // Get the classes for the input
  const inputClasses = input({
    variant,
    size,
    status: error ? "error" : "default",
  });
  return (
    <span className="flex flex-col gap-1">
      {label && (
        <label
          className={error ? "text-error" : ""}
          htmlFor={label.toLowerCase()}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(inputClasses, props.className)}
        autoComplete={"current-password"}
        id={"new-password"}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
      <style jsx>{`
        /* Change Autocomplete styles in Chrome*/
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
          border: 1px solid var(--surface-content);
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px var(--surface-content) inset;
          box-shadow: 0 0 0px 1000px var(--surface-content) inset;
          transition: background-color 5000s ease-in-out 0s;
          color: white;
        }
      `}</style>
    </span>
  );
});

export default Input;
