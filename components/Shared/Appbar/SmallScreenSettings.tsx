import React from "react";
import { NavbarContent, NavbarItem } from "@heroui/react";
import SearchModal from "../SearchModal";

const SmallScreenSettings = () => {
  return (
    <NavbarContent className="searchicon" justify="end">
      <NavbarItem>
        <SearchModal viewport="mobile" />
      </NavbarItem>
    </NavbarContent>
  );
};

export default SmallScreenSettings;
