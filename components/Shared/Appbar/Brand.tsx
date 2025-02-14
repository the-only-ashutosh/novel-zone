"use client";
import React from "react";
import { NavbarContent, NavbarBrand } from "@heroui/react";
import Link from "next/link";
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
          <p className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]">
            NOVEL ZONE
          </p>
        </Link>
      </NavbarBrand>
    </NavbarContent>
  );
};

export default Brand;
