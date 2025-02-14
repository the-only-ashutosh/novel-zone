import React, { ReactElement } from "react";
import { NavbarContent, NavbarItem } from "@heroui/react";
import SearchModal from "../SearchModal";
import SettingsMenu from "../Settings";

const BigScreenSettings = ({ ava }: { ava: ReactElement }) => {
  return (
    <NavbarContent justify="end">
      <NavbarItem>
        <SearchModal viewport="desktop" />
      </NavbarItem>
      <NavbarItem className="flex sm:hidden md:hidden">
        <SettingsMenu />
      </NavbarItem>
      {ava}
    </NavbarContent>
  );
};

export default BigScreenSettings;
