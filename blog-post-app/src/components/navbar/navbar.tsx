import { useTheme } from "@/hooks/useTheme";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import DarkModeToggle from "./ThemeToggle";
import useIsPinned from "./hooks/isPinned";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isPinned, ref: navBarRef } = useIsPinned<HTMLDivElement>();

  return (
    <div
      ref={navBarRef}
      className="bg-surface-container dark:bg-opacity-30 dark:bg-clip-padding dark:backdrop-blur-md dark:backdrop-filter "
    >
      <Container
        className={`flex h-full w-full items-center justify-end gap-4 py-1 ${
          isPinned ? "border-b border-brand-border shadow-sm" : ""
        }`}
      >
        <DarkModeToggle onClick={() => toggleTheme()} colorTheme={theme} />
        <Link href="/auth/sign-in">
          <Button className="my-2 h-10" variant="filled">
            Sign In
          </Button>
        </Link>
        <Button className="h-10" variant="filled" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Container>
    </div>
  );
}

export default Navbar;
