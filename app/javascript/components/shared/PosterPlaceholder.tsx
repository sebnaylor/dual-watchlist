import React from "react";

interface PosterPlaceholderProps {
  className?: string;
}

const PosterPlaceholder: React.FC<PosterPlaceholderProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center bg-theme-tertiary ${className}`}
    >
      <svg
        className="w-12 h-12 text-theme-muted opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    </div>
  );
};

export default PosterPlaceholder;
