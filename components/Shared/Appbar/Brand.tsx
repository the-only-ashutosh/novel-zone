import React from "react";
import { NavbarContent, NavbarBrand } from "@nextui-org/react";
import Link from "next/link";
import Logo from "./Logo";

const Brand = () => {
  return (
    <NavbarContent className="pr-3 lg:hidden xl:hidden" justify="center">
      <NavbarBrand>
        <Link
          href="/"
          color="foreground"
          className="flex justify-center items-center"
        >
          <Logo />
          <p className="font-bold text-inherit">NOVEL ZONE</p>
        </Link>
      </NavbarBrand>
    </NavbarContent>
  );
};

export default Brand;
