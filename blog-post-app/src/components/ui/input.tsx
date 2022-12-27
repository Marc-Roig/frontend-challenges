import type { MergeComponentProps } from "@/utils/types";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const input = cva(
  `text-md rounded-xl text-brand-text1 shadow-sm placeholder:text-brand-text2
  focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-surface1 `,
  {
    variants: {
      variant: {
        default: "border border-brand-border bg-brand-surface3",
        outline: "",
        filled: "",
        light: "",
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
    },
  }
);

export type InputProps = VariantProps<typeof input>;

// eslint-disable-next-line react/display-name
const Input = forwardRef<
  HTMLInputElement,
  MergeComponentProps<"input", { label?: string }>
>(({ label, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
      <input
        ref={ref}
        className={`
        text-md rounded-xl border border-brand-border bg-brand-surface3 px-4 py-2 font-light text-brand-text1 shadow-sm
        placeholder:text-brand-text2 
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-surface1
        ${props.className}`}
        {...props}
      />
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
          border: 1px solid var(--surface3);
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px var(--surface3) inset;
          box-shadow: 0 0 0px 1000px var(--surface3) inset;
          transition: background-color 5000s ease-in-out 0s;
          color: white;
        }
      `}</style>
    </div>
  );
});

export default Input;
