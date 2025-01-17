"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownTrigger,
  Dropdown,
} from "@heroui/react";
import { ChevronDownIcon } from "../../UI/ChevronDownIcon";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Logo from "./Logo";
const MenuToggle = dynamic(() => import("./MenuToggle"), { ssr: true });
const Brand = dynamic(() => import("./Brand"), { ssr: true });
const NovelList = dynamic(() => import("./NovelList"), { ssr: true });
const GenreList = dynamic(() => import("./GenreList"), { ssr: true });
const BigScreenSettings = dynamic(() => import("./BigScreenSettings"), {
  ssr: false,
});
const SmallScreenSettings = dynamic(() => import("./SmallScreenSettings"), {
  ssr: false,
});
const NavMenu = dynamic(() => import("./NavMenu"), { ssr: false });

export default function Appbar({
  viewport,
}: Readonly<{ viewport: string | null }>) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const loc = usePathname();

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{ wrapper: "max-w-full justify-start" }}
    >
      <MenuToggle menuState={isMenuOpen} />
      <Brand />

      {viewport === "desktop" && (
        <NavbarContent
          className="hidden lg:flex xl:flex gap-4"
          justify="center"
        >
          <NavbarBrand>
            <Link href="/" color="foreground">
              <Logo />
              <p className="font-bold text-inherit">NOVEL ZONE</p>
            </Link>
          </NavbarBrand>
          <NavbarItem value="Novel List">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent text-medium data-[hover=true]:bg-transparent"
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
                >
                  Novel List
                </Button>
              </DropdownTrigger>
              <NovelList loc={loc} />
            </Dropdown>
          </NavbarItem>
          <NavbarItem value="Genre">
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent text-medium data-[hover=true]:bg-transparent"
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
              <GenreList menuclose={null} />
            </Dropdown>
          </NavbarItem>
          <NavbarItem value="Categories">
            <Link
              href="/filter/categories"
              aria-current={loc === "/filter/categories" || "page"}
              color={
                loc.includes("/filter/categories") ? "primary" : "foreground"
              }
            >
              Categories
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      {viewport === "desktop" && <BigScreenSettings />}

      <SmallScreenSettings />
      <NavMenu loc={loc} menuclose={setIsMenuOpen} />
    </Navbar>
  );
}
