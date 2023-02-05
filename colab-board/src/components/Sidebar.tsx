import { useState } from "react";
import { RiChat1Line, RiQuillPenLine } from "react-icons/ri";
import { Button } from "./ui/Button";

const Sidebar = () => {
  const [active, setActive] = useState<"chat" | "notes">("chat");

  const handlePageChange = (page: "chat" | "notes") => {
    setActive(page);
  };

  return (
    <aside className="flex h-screen border-r border-r-border">
      {/* LOGO */}
      {/* Todo */}
      {/* NAVIGATION */}
      <nav className="m-auto mx-3 flex flex-col gap-5">
        <Button
          size="icon"
          variant={active === "chat" ? "subtle" : "ghost"}
          onClick={() => handlePageChange("chat")}
        >
          <RiQuillPenLine size={30} />
        </Button>
        <Button
          size="icon"
          variant={active === "notes" ? "subtle" : "ghost"}
          onClick={() => handlePageChange("notes")}
        >
          <RiChat1Line size={30} />
        </Button>
      </nav>
    </aside>
  );
};
export default Sidebar;
