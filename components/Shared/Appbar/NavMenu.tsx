"use client";
import React from "react";
import {
  NavbarMenu,
  Dropdown,
  NavbarItem,
  NavbarMenuItem,
  DropdownTrigger,
  Button,
} from "@heroui/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronDownIcon } from "@/components/UI/ChevronDownIcon";
import { useRouter } from "next/navigation";
import SettingsMenu from "../Settings";
const GenreList = dynamic(() => import("./GenreList"), { ssr: true });

const NavMenu = ({
  loc,
  menuclose,
}: {
  loc: string;
  menuclose: (state: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <NavbarMenu className="flex lg:hidden xl:hidden">
      <Dropdown
        backdrop="blur"
        classNames={{
          base: "right-1.5 before:bg-default-200",
          content: "p-0 border-small border-divider bg-background",
        }}
        offset={-50}
      >
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent text-large data-[hover=true]:bg-transparent min-w-0 h-[28px]"
              endContent={
                <ChevronDownIcon
                  fill="currentColor"
                  size={16}
                  height={null}
                  width={null}
                />
              }
              radius="sm"
              variant="light"
              color={loc.includes("/filter/genre") ? "primary" : "default"}
            >
              Genre
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <GenreList menuclose={menuclose} />
      </Dropdown>
      <NavbarMenuItem
        onClick={() => {
          router.push("/filter/categories");
          menuclose(false);
        }}
      >
        <Link
          href="/filter/categories"
          aria-current={loc.startsWith("/filter/categories") || "page"}
          color={
            loc.startsWith("/filter/categories") ? "primary" : "foreground"
          }
        >
          Categories
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem
        onClick={() => {
          router.push("/filter/allnovels");
          menuclose(false);
        }}
      >
        <Link
          aria-current={loc.startsWith("/filter/allnovels") || "page"}
          color={loc.startsWith("/filter/allnovels") ? "primary" : "foreground"}
          href="/filter/allnovels"
        >
          All Novels
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem
        onClick={() => {
          router.push("/filter/hotnovels");
          menuclose(false);
        }}
      >
        <Link
          aria-current={loc.startsWith("/filter/hotnovels") || "page"}
          color={loc.startsWith("/filter/hotnovels") ? "primary" : "foreground"}
          href="/filter/hotnovels"
        >
          Hot Novels
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem
        onClick={() => {
          router.push("/filter/newupdates");
          menuclose(false);
        }}
      >
        <Link
          aria-current={loc.startsWith("/filter/newupdates") || "page"}
          color={
            loc.startsWith("/filter/newupdates") ? "primary" : "foreground"
          }
          href="/filter/newupdates"
        >
          New Updates
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem
        onClick={() => {
          router.push("/filter/completed");
          menuclose(false);
        }}
      >
        <Link
          aria-current={loc.startsWith("/filter/completed") || "page"}
          color={loc.startsWith("/filter/completed") ? "primary" : "foreground"}
          href="/filter/completed"
        >
          Completed
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem
        onClick={() => {
          router.push("/filter/mostpopular");
          menuclose(false);
        }}
      >
        <Link
          aria-current={loc.startsWith("/filter/mostpopular") || "page"}
          color={
            loc.startsWith("/filter/mostpopular") ? "primary" : "foreground"
          }
          href="/filter/mostpopular"
        >
          Most Popular
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem className="flex justify-between items-center">
        <span>Settings</span>
        <SettingsMenu />
      </NavbarMenuItem>
    </NavbarMenu>
  );
};

export default NavMenu;
