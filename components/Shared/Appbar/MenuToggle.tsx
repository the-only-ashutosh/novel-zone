import React from "react";
import { NavbarMenuToggle, NavbarContent } from "@nextui-org/react";

const MenuToggle = ({ menuState }: { menuState: boolean }) => {
  return (
    <NavbarContent className="max-w-fit lg:hidden xl:hidden" justify="start">
      <NavbarMenuToggle aria-label={menuState ? "Close menu" : "Open menu"} />
    </NavbarContent>
  );
};

export default MenuToggle;
