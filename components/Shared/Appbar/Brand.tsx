import React from "react";
import { NavbarContent, NavbarBrand } from "@heroui/react";
import { ProgressBarLink } from "../Progressbar/progress-bar";

const Brand = ({ menustate }: { menustate: (s: boolean) => void }) => {
  return (
    <NavbarContent className="pr-3 lg:hidden xl:hidden" justify="center">
      <NavbarBrand>
        <ProgressBarLink
          href="/"
          color="foreground"
          className="flex justify-center items-center"
          func={() => menustate(false)}
        >
          <p className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]">
            NOVEL ZONE
          </p>
        </ProgressBarLink>
      </NavbarBrand>
    </NavbarContent>
  );
};

export default Brand;
