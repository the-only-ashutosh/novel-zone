"use client";
import React from "react";
import { NavbarContent, NavbarBrand } from "@heroui/react";
import Link from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

const Brand = ({ menustate }: { menustate: (s: boolean) => void }) => {
  const router = useRouter();
  return (
    <NavbarContent className="pr-3 lg:hidden xl:hidden" justify="center">
      <NavbarBrand>
        <Link
          href="/"
          color="foreground"
          className="flex justify-center items-center"
          onClick={() => {
            menustate(false);
            router.push("/");
          }}
        >
          <Logo />
          <p className="font-bold text-inherit">NOVEL ZONE</p>
        </Link>
      </NavbarBrand>
    </NavbarContent>
  );
};

export default Brand;
