import React from "react";

interface UnderlineTextProps {
  children: string;
}

const UnderlineText = ({ children }: UnderlineTextProps) => {
  const text = children;

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
          background-color: #155e75;
          content: "";
          height: 25%;
          position: absolute;
          left: 0;
          margin-left: -0.5rem;
          top: 65%;
          width: calc(100% + 1rem);
          z-index: -1;
        }
      `}</style>
    </>
  );
};

export default UnderlineText;
