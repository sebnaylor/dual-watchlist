import React from "react";
import classNames from "classnames";

export interface ButtonProps {
  text: string;
  type: "primary" | "secondary";
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
        "inline-flex justify-center px-4 py-2 rounded-2xl",
        {
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
