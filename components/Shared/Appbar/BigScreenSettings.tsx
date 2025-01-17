import React from "react";
import { NavbarContent, NavbarItem } from "@heroui/react";
import SearchModal from "../SearchModal";
import SettingsMenu from "../Settings";

const BigScreenSettings = () => {
  return (
    <NavbarContent justify="end" className="modeswitch">
      <NavbarItem>
        <SearchModal />
      </NavbarItem>
      <NavbarItem>
        <SettingsMenu />
      </NavbarItem>
    </NavbarContent>
  );
};

export default BigScreenSettings;
