import React from "react";
import classNames from "classnames";

interface ButtonProps {
  text: string;
  type: "primary" | "secondary" | "tertiary";
  pressed: boolean;
  icon: React.ReactNode | null;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  pressed,
  icon,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all",
        {
          "opacity-50 cursor-not-allowed": disabled,
          "bg-brand-primary hover:bg-brand-primary/90 text-white":
            type === "primary" && !pressed && !disabled,
          "bg-green-600 hover:bg-green-700 text-white":
            type === "primary" && pressed && !disabled,
          "bg-brand-primary/20 hover:bg-brand-primary/30 text-brand-primary border border-brand-primary/30":
            type === "secondary" && !pressed && !disabled,
          "bg-green-600/20 hover:bg-green-600/30 text-green-500 border border-green-500/30":
            type === "secondary" && pressed && !disabled,
          "bg-theme-tertiary hover:bg-theme-secondary text-theme-primary":
            type === "tertiary" && !pressed && !disabled,
          "bg-green-600/20 text-green-500":
            type === "tertiary" && pressed && !disabled,
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
