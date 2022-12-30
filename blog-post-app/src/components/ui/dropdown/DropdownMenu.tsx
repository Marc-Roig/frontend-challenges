import useClickOutside from "@/hooks/useClickOutside";
import React, { useState } from "react";
import { useRef } from "react";

export interface Items {
  label: string;
  color?: "default" | "red";
  onClick: () => void;
}

export interface DropdownMenuProps {
  className?: string;
  items: Items[];
}

function DropdownMenu({ className, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        className="inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-brand-subtleText hover:bg-surface-highlight"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-44 -translate-x-16 translate-y-1 rounded-lg border border-brand-border bg-surface-content shadow">
          <ul>
            {items.map((item) => (
              <li key={item.label}>
                <a
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={`block cursor-pointer rounded-lg py-3 px-4 text-brand-text hover:bg-surface-highlight ${
                    item.color === "red" ? "text-red-500" : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
