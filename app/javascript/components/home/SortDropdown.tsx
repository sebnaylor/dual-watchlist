import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check } from "lucide-react";
import { SortOption } from "./types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "addedAt", label: "Date Added" },
  { value: "rating", label: "Rating" },
  { value: "releaseDate", label: "Release Date" },
  { value: "title", label: "A-Z" },
];

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel = sortOptions.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-brand-purple hover:bg-brand-purple/80 rounded-lg text-sm text-white transition-colors"
      >
        <ArrowUpDown className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-brand-purple border border-brand-muted/20 rounded-lg shadow-lg overflow-hidden z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors"
            >
              <span>{option.label}</span>
              {value === option.value && (
                <Check className="w-4 h-4 text-brand-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
