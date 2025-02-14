"use client";
import React, { ReactElement } from "react";
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
import GenreList from "./GenreList";
const MenuToggle = dynamic(() => import("./MenuToggle"), { ssr: true });
const Brand = dynamic(() => import("./Brand"), { ssr: true });
const NovelList = dynamic(() => import("./NovelList"), { ssr: true });

const BigScreenSettings = dynamic(() => import("./BigScreenSettings"), {
  ssr: true,
});
import NavMenu from "./NavMenu";

export default function Appbar({
  ava,
}: Readonly<{
  ava: ReactElement;
}>) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const loc = usePathname();

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{ wrapper: "max-w-full justify-start" }}
    >
      <>
        <MenuToggle menuState={isMenuOpen} />
        <Brand menustate={setIsMenuOpen} />
      </>

      <NavbarContent className="gap-4 sm:hidden md:hidden" justify="center">
        <NavbarBrand>
          <Link href="/" color="foreground">
            <Logo />
            <p className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]">
              NOVEL ZONE
            </p>
          </Link>
        </NavbarBrand>
        <NavbarItem value="Novel List">
          <Dropdown
            radius="sm"
            showArrow
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content: "p-0 border-small border-divider bg-background",
            }}
          >
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
                color={
                  loc.match(
                    /(allnovels|completed|hotnovels|mostpopular|newupdates)/g
                  )
                    ? "primary"
                    : "default"
                }
              >
                Novel List
              </Button>
            </DropdownTrigger>
            <NovelList loc={loc} />
          </Dropdown>
        </NavbarItem>
        <NavbarItem value="Genre">
          <Dropdown
            backdrop="blur"
            radius="sm"
            showArrow
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content: "p-0 border-small border-divider bg-background",
            }}
          >
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

      <BigScreenSettings ava={ava} />

      <NavMenu loc={loc} menuclose={setIsMenuOpen} />
    </Navbar>
  );
}
