import classNames from "classnames";
import React from "react";

interface TextProps {
  text: string;
  type: "h1" | "h2" | "h3" | "p";
  alignment?: "left" | "center" | "right";
}

const Text: React.FC<TextProps> = ({ text, type, alignment = "center" }) => {
  const Tag = type;

  return (
    <Tag
      className={classNames("text-theme-primary", {
        "text-2xl md:text-3xl font-bold": type === "h1",
        "text-xl md:text-2xl font-semibold": type === "h2",
        "text-lg md:text-xl font-medium": type === "h3",
        "text-base text-theme-secondary": type === "p",
        "text-left": alignment === "left",
        "text-center": alignment === "center",
        "text-right": alignment === "right",
      })}
    >
      {text}
    </Tag>
  );
};

export default Text;
