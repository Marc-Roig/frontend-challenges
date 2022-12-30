import useClickOutside from "@/hooks/useClickOutside";
import React, { useState } from "react";
import { useRef } from "react";
import {
  Container,
  Menu,
  MenuAnchor,
  MenuOpenButton,
} from "./DropdownMenu.styles";

export interface Items {
  label: string;
  color?: "default" | "red";
  onClick: () => void;
}

export interface DropdownMenuProps {
  className?: string;
  items: Items[];
}

const DropdownIcon = () => (
  <svg
    className="h-6 w-6"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
  </svg>
);

function DropdownMenu({ className, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <Container ref={ref} className={`${className}`}>
      <MenuOpenButton onClick={() => setIsOpen(!isOpen)}>
        <DropdownIcon />
      </MenuOpenButton>
      {isOpen && (
        <Menu>
          <ul>
            {items.map((item) => (
              <li key={item.label}>
                <MenuAnchor
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  color={item.color}
                >
                  {item.label}
                </MenuAnchor>
              </li>
            ))}
          </ul>
        </Menu>
      )}
    </Container>
  );
}

export default DropdownMenu;
