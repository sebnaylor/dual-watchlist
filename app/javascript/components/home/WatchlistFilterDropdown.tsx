import React, { useState, useRef, useEffect } from "react";
import { Filter, Check } from "lucide-react";
import { WatchlistFilter } from "./types";

interface WatchlistFilterDropdownProps {
  value: WatchlistFilter;
  onChange: (value: WatchlistFilter) => void;
  partnerName: string | null;
}

const WatchlistFilterDropdown: React.FC<WatchlistFilterDropdownProps> = ({
  value,
  onChange,
  partnerName,
}) => {
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

  const filterOptions: { value: WatchlistFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "mine", label: "Yours" },
    { value: "partner", label: partnerName || "Partner" },
  ];

  const currentLabel = filterOptions.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-brand-purple hover:bg-brand-purple/80 rounded-lg text-sm text-white transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-brand-purple border border-brand-muted/20 rounded-lg shadow-lg overflow-hidden z-50">
          {filterOptions.map((option) => (
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

export default WatchlistFilterDropdown;
