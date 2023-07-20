"use client";
import { useState, useEffect } from "react";

const hats = [
  {
    prep: "a",
    suffix: "Web Developer",
  },
  {
    prep: "a",
    suffix: "UI/UX Designer",
  },
  {
    prep: "a",
    suffix: "Graphics Designer",
  },
];

type Hat = {
  prep?: string;
  suffix: string;
};

type TypeWriterProps = {
  appendClass?: string;
  hats: Hat[];
  prefix: string;
};

export default function TypeWriter({
  appendClass,
  hats,
  prefix,
}: TypeWriterProps) {
  let className = "flex flex-col gap-4";
  if (appendClass) className += " " + appendClass;

  const typeWriterClass =
    "font-bold border-b-2 border-b-blue-400 border-r-2 pr-1" +
    "animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto";

  const [currentHat, setCurrentHat] = useState(0);
  const [collapseClass, setCollapseClass] = useState(" w-0");

  useEffect(() => {
    setTimeout(() => setCollapseClass(" w-full"), 100);

    const incrementHat = () => {
      setCollapseClass(" w-0");
      setTimeout(() => {
        setCurrentHat((oldVal) => {
          let hatIndex;
          if (oldVal >= hats.length - 1) {
            hatIndex = 0;
          } else {
            hatIndex = oldVal + 1;
          }

          return hatIndex;
        });
      }, 1100);
      setTimeout(() => {
        setCollapseClass(" w-full");
      }, 1000);
    };
    const id = setInterval(incrementHat, 4000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={className}>
      <div className="text-5xl md:text-6xl text-center mx-auto">
        Parker <span className="text-blue-400 font-bold">Rex</span>
      </div>
      <div className="flex gap-2 text-2xl md:text-4xl mx-auto">
        <div className="shrink-0 whitespace-nowrap ml-auto">
          {prefix}
          {hats[currentHat].prep ? ` ${hats[currentHat].prep} ` : ""}
        </div>
        <div className={`${typeWriterClass}${collapseClass}`}>
          {hats[currentHat].suffix}
        </div>
      </div>
    </div>
  );
}
