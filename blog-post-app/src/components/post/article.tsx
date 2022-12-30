import Image from "next/image";
import React from "react";
import UnderlineText from "../ui/text/UnderlineText";

const Article = () => {
  return (
    <section id="content" className="contents">
      {/* Title */}
      <h1 className="text-6xl font-semibold tracking-tight">
        Uncovering the <UnderlineText>secrets of the universe</UnderlineText>
      </h1>
      <article
        id="post"
        className="flex flex-col items-center gap-6 
                 md:flex-row md:items-start "
      >
        {/* Image */}
        <div
          className="float-left flex w-full items-center justify-center rounded-[4rem] 
                   bg-dotted bg-[size:10px_10px] 
                   md:w-auto md:shrink-0"
        >
          <Image
            src="/planet.png"
            width={300}
            height={300}
            alt="planet"
            className="motion-safe:animate-bounceSlow"
          />
        </div>
        {/* Post Text */}
        <p className="text-justify font-light">
          Space is a vast and fascinating frontier that has captivated the human
          imagination for centuries. From the earliest civilizations, people
          have gazed up at the stars and wondered what lies beyond the
          boundaries of our world . Today, we have sent probes and spacecraft to
          explore the vast expanse of space, and we have discovered a wealth of
          fascinating facts and mysteries.
        </p>
      </article>
    </section>
  );
};

export default Article;
