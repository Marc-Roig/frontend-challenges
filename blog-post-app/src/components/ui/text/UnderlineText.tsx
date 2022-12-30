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
        <span key={index} className="word">
          {word + " "}
        </span>
      ))}
      <style jsx>{`
        span.word {
          position: relative;
        }

        span.word:after {
          background-color: ${theme === "dark" ? "#5d21d0" : "#e1bc29"};
          content: "";
          height: 25%;
          position: absolute;
          left: 0;
          margin-left: -0.3rem;
          top: 75%;
          width: calc(100% + 0.6rem);
          z-index: -1;
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default UnderlineText;
