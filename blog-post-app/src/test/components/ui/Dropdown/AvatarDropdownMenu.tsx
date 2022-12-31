import useClickOutside from "@/hooks/useClickOutside";
import React, { useState } from "react";
import { useRef } from "react";
import {
  Container,
  Menu,
  MenuAnchor,
  MenuOpenButton,
} from "./DropdownMenu.styles";
import type { MergeComponentProps } from "@/utils/types";

export interface Items {
  label: string;
  color?: "default" | "red";
  onClick: () => void;
}

export interface DropdownMenuProps {
  items: Items[];
}

function DropdownMenu({
  children,
  className,
  items,
}: MergeComponentProps<"div", DropdownMenuProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <Container ref={ref} className={`${className}`}>
      <MenuOpenButton className="p-1 " onClick={() => setIsOpen(!isOpen)}>
        {children}
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
