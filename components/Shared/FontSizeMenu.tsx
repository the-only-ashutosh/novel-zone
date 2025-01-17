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

const FontSizeMenu = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([hasCookie("fontSize") ? getCookie("fontSize")!.toString() : "18"])
  );

  const [fValue, setFValue] = React.useState(
    hasCookie("fontSize") ? getCookie("fontSize")!.toString() : "18"
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
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
          setCookie("fontSize", keys.currentKey!, { sameSite: "strict" });
          if (document.getElementById("content-page") !== null) {
            document.getElementById(
              "content-page"
            )!.style.fontSize = `${keys.currentKey!}px`;
          }
          setFValue(keys.currentKey!);
        }}
      >
        <DropdownItem key="12">12</DropdownItem>
        <DropdownItem key="14">14</DropdownItem>
        <DropdownItem key="16">16</DropdownItem>
        <DropdownItem key="18">18</DropdownItem>
        <DropdownItem key="20">20</DropdownItem>
        <DropdownItem key="22">22</DropdownItem>
        <DropdownItem key="24">24</DropdownItem>
        <DropdownItem key="26">26</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default FontSizeMenu;
