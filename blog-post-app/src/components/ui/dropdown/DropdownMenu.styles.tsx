import tw from "tailwind-styled-components";

export const ThreadBorder = tw.div<{ depth: number }>`
  ${(props) => (props.depth ? "border-l border-brand-border w-full" : "w-full")}
`;

export const Container = tw.div`
  relative
`;

export const MenuOpenButton = tw.button`
  inline-flex items-center 
  rounded-lg p-2 
  text-brand-subtleText text-center text-sm font-medium 
  hover:bg-surface-highlight
`;

export const Menu = tw.div`
  absolute z-10 w-44 -translate-x-16 translate-y-1 
  rounded-lg border border-brand-border 
  bg-surface-content 
  shadow
`;

export const MenuAnchor = tw.a<{ color?: "default" | "red" }>`
  block cursor-pointer 
  rounded-lg py-3 px-4 
  text-brand-text 
  hover:bg-surface-highlight

  ${(props) => (props.color === "red" ? "text-red-500" : "")}
`;
