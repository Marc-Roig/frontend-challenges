import tw from "tailwind-styled-components";

export const ThreadBorder = tw.div<{ depth: number }>`
  ${(props) => (props.depth ? "border-l border-brand-border w-full" : "w-full")}
`;

export const ThreadContainer = tw.div<{ depth: number }>`
  ${(props) => (props.depth ? "ml-8 w-[calc(100%-2rem)]" : "")}
`;

export const CommentContainer = tw.div`
  border2
  surface2 
  flex 
  w-full 
  flex-grow 
  flex-col 
  items-start 
  gap-4 
  rounded-xl 
  border-brand-border 
  p-6 
  shadow-sm
`;

export const Header = tw.div`
  flex w-full justify-between -my-2 
`;

export const PostInfo = tw.div`
  flex justify-start gap-2 items-center
`;

export const Author = tw.p`
  text-sm font-normal text-brand-text1
`;

export const PublicationDate = tw.p`
  text-sm font-normal text-brand-text2
`;

export const Content = tw.p`
  text-md font-normal text-brand-text1
`;

export const Footer = tw.div`
  flex w-full justify-start gap-4
`;
