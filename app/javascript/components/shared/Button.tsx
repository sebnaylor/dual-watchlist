import React from "react";
import classNames from "classnames";

export interface ButtonProps {
  text: string;
  type: "primary" | "secondary" | "tertiary";
  pressed: boolean;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
        "inline-flex items-center gap-x-2 px-2 py-1 rounded-2xl min-w-28",
        {
          "bg-emerald-800 border border-emerald-600":
            type === "primary" && pressed,
          "bg-emerald-500": type === "primary" && !pressed,
          "bg-indigo-500": type == "secondary",
          "bg-indigo-800 border border-indigo-600":
            type == "secondary" && pressed,
        }
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
