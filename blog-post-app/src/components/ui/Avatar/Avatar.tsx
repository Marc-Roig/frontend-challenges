import { cn } from "@/utils/styles";
import type { MergeComponentProps } from "@/utils/types";
import { cva } from "class-variance-authority";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "default";
}

function getSize(size: AvatarProps["size"] = "md") {
  switch (size) {
    case "sm":
      return 30;
    case "md":
      return 40;
    case "lg":
      return 56;
    case "xl":
      return 72;
  }
}

const avatar = cva(`inline-block overflow-hidden`, {
  variants: {
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    radius: "full",
  },
});

const indicator = cva(
  `absolute rounded-full border-2 border-white dark:border-gray-800`,
  {
    variants: {
      status: {
        default: "",
        online: "bg-green-400",
        offline: "bg-red-400",
      },
      size: {
        sm: "top-0 left-5 h-2 w-2",
        md: "top-0 left-7 h-3.5 w-3.5",
        lg: "top-0 left-10 h-4 w-4",
        xl: "top-0 left-14 h-5 w-5",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      status: "default",
      size: "md",
    },
  }
);

function Avatar({
  radius,
  size,
  status,
  ...props
}: MergeComponentProps<"img", AvatarProps>) {
  const imgSize = getSize(size);

  return (
    <div className="relative" onClick={props.onClick}>
      <Image
        className={cn(avatar({ radius }), props.className)}
        width={imgSize}
        height={imgSize}
        src={props.src || "/owl.png"}
        alt=""
      />
      {status && <span className={indicator({ status, size })} />}
    </div>
  );
}

export default Avatar;
