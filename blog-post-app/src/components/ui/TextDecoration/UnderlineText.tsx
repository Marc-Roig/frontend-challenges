import { useTheme } from "@/hooks/useTheme";
import React from "react";

interface UnderlineTextProps {
  children: string;
}

const UnderlineText = ({ children }: UnderlineTextProps) => {
  const text = children;

  const { theme } = useTheme();

  return (
    <>
      {text.split(" ").map((word, index) => (
        <>
          <span key={index} className="inline-block">
            {word}
          </span>{" "}
        </>
      ))}
      <style jsx>{`
        span {
          position: relative;
        }

        span:after {
          background-color: ${theme === "dark" ? "#5d21d0" : "#e1bc29"};
          content: "";
          height: 25%;
          position: absolute;
          left: 0;
          margin-left: -0.65rem;
          top: 80%;
          width: calc(100% + 1.3rem);
          z-index: -1;
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default UnderlineText;
