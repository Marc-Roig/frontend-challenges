import useDarkTheme from "@/hooks/useDarkTheme";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import DarkModeToggle from "./dark-mode-toggle";
import useIsPinned from "./hooks/isPinned";

function Navbar() {
  const { theme, switchTheme } = useDarkTheme();
  const navBarRef = useRef<HTMLDivElement>(null);
  const { isPinned } = useIsPinned(navBarRef);

  return (
    <div
      ref={navBarRef}
      className="bg-surface-container dark:bg-gray-900 dark:bg-opacity-30 dark:bg-clip-padding dark:backdrop-blur-md dark:backdrop-filter "
    >
      <Container
        className={`flex h-full w-full items-center justify-end gap-2 py-1 ${
          isPinned ? "border-b border-brand-border shadow-sm" : ""
        }`}
      >
        <DarkModeToggle onChange={() => switchTheme()} colorTheme={theme} />
        <Link href="/auth/sign-in">
          <Button
            className="h-10"
            variant="filled"
            // onClick={
            // signIn("credentials", {
            //   email: "marc12info@gmail.com",
            //   password: "1234",
            // })
            // }
          >
            Sign In
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default Navbar;
