"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@heroui/react";
import { getCookie, setCookie, hasCookie } from "cookies-next/client";
import { ChevronDownIcon } from "../UI/ChevronDownIcon";
import { useRouter } from "next/navigation";

const FontMenu = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([
      hasCookie("fontStyle") ? getCookie("fontStyle")!.toString() : "Rubik",
    ])
  );
  const [fValue, setFValue] = React.useState(
    hasCookie("fontStyle") ? getCookie("fontStyle")!.toString() : "Rubik"
  );
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          id="font-button"
          className="capitalize p-0 w-fit h-fit data-[hover=true]:bg-transparent items-center justify-between"
          variant="light"
          disableRipple
          endContent={
            <ChevronDownIcon
              fill="currentColor"
              size={16}
              height={null}
              width={null}
            />
          }
        >
          {fValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          setSelectedKeys(new Set([keys.currentKey!]));
          setCookie("fontStyle", keys.currentKey!, { sameSite: "strict" });
          router.refresh();
          setFValue(keys.currentKey!);
        }}
      >
        <DropdownItem key="Caveat">Caveat</DropdownItem>
        <DropdownItem key="Exo2">Exo2</DropdownItem>
        <DropdownItem key="Hind Mysuru">Hind Mysuru</DropdownItem>
        <DropdownItem key="Inter">Inter</DropdownItem>
        <DropdownItem key="Josefins">Josefins</DropdownItem>
        <DropdownItem key="Opensans">Opensans</DropdownItem>
        <DropdownItem key="Playwrite">Playwrite</DropdownItem>
        <DropdownItem key="Roboto">Roboto</DropdownItem>
        <DropdownItem key="Rubik">Rubik</DropdownItem>
        <DropdownItem key="Slabo">Slabo</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default FontMenu;
