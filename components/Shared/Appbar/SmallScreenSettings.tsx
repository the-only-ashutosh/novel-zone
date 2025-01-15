import React from "react";
import { NavbarContent, NavbarItem } from "@nextui-org/react";
import SearchModal from "../SearchModal";

const SmallScreenSettings = () => {
  return (
    <NavbarContent className="searchicon" justify="end">
      <NavbarItem>
        <SearchModal />
      </NavbarItem>
    </NavbarContent>
  );
};

export default SmallScreenSettings;
