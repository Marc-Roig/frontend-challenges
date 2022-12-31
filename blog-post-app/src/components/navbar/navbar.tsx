import { useTheme } from "@/hooks/useTheme";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import DarkModeToggle from "./ThemeToggle";
import useIsPinned from "./hooks/isPinned";
import Avatar from "../ui/Avatar/Avatar";
import DropdownMenu from "../ui/Dropdown/AvatarDropdownMenu";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isPinned, ref: navBarRef } = useIsPinned<HTMLDivElement>();

  const { status } = useSession();
  const isLogged = status === "authenticated";

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

        {isLogged ? (
          <>
            <DropdownMenu
              className="my-0.5"
              items={[{ label: "Log out", onClick: signOut, color: "red" }]}
            >
              <Avatar status="online" size="md" />
            </DropdownMenu>
          </>
        ) : (
          <Link href="/auth/sign-in">
            <Button className="my-2 h-10" variant="filled">
              Sign In
            </Button>
          </Link>
        )}
      </Container>
    </div>
  );
}

export default Navbar;
