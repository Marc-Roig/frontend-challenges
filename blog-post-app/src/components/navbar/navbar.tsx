import useDarkTheme from "@/hooks/useDarkTheme";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";
import { Button } from "../atoms/button";
import { Container } from "../atoms/container";
import DarkModeToggle from "../atoms/dark-mode-toggle";
import useIsPinned from "./hooks/isPinned";

function Navbar() {
  const { theme, switchTheme } = useDarkTheme();
  const navBarRef = useRef<HTMLDivElement>(null);
  const { isPinned } = useIsPinned(navBarRef);

  return (
    <div
      ref={navBarRef}
      className="bg-brand-surface2 dark:bg-gray-900 dark:bg-opacity-30 dark:bg-clip-padding dark:backdrop-blur-md dark:backdrop-filter "
    >
      <Container
        className={`flex h-full w-full items-center justify-end gap-2 py-1 ${
          isPinned ? "border-b border-brand-border shadow-sm" : ""
        }`}
      >
        <DarkModeToggle onChange={() => switchTheme()} colorTheme={theme} />
        <Button
          className="h-10"
          onClick={() =>
            signIn("credentials", {
              email: "marc12info@gmail.com",
              password: "1234",
            })
          }
        >
          Sign In
        </Button>
      </Container>
    </div>
  );
}

export default Navbar;
