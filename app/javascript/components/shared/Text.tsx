import classNames from "classnames";
import React from "react";

interface TextProps {
  text: string;
  type: "h1" | "h2" | "h3" | "p";
  alignment?: "left";
}

const Text: React.FC<TextProps> = ({ text, type, alignment }) => {
  const Tag = type;

  return (
    <Tag
      className={classNames("text-white text-center", {
        "text-2xl font-medium": type === "h1",
        "text-xl font-normal": type === "h2",
        "text-lg font-light": type === "h3",
        "text-base font-light": type === "p",
        "!text-left": alignment === "left",
      })}
    >
      {text}
    </Tag>
  );
};

export default Text;
