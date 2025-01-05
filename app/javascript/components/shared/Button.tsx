import React from "react";
import classNames from "classnames";

export interface ButtonProps {
  text: string;
  type: "primary" | "secondary" | "tertiary";
  pressed: boolean;
  icon: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  pressed,
  icon,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        "inline-flex justify-center px-2 py-1 rounded-2xl min-w-28",
        {
          "bg-rose-900": type === "primary" && pressed,
          "bg-rose-700": type === "primary",
          "bg-fuchsia-400": type === "secondary",
        }
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
