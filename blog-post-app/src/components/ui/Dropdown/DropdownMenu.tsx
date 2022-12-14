import useClickOutside from "@/hooks/useClickOutside";
import React, { useState } from "react";
import { useRef } from "react";
import {
  Container,
  Menu,
  MenuAnchor,
  MenuOpenButton,
} from "./DropdownMenu.styles";
import { HiDotsHorizontal } from "react-icons/hi";

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
    <Container ref={ref} className={`${className}`}>
      <MenuOpenButton onClick={() => setIsOpen(!isOpen)}>
        <HiDotsHorizontal size={"1.5rem"} />
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
