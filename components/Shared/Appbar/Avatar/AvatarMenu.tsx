"use client";
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  AvatarIcon,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const AvatarMenu = ({
  name,
  image,
  // signout,
  email,
}: {
  name: string;
  image: string;
  email: string;
  // signout: () => void;
}) => {
  const router = useRouter();
  return (
    <Dropdown
      placement="bottom-end"
      showArrow
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
      radius="sm"
    >
      <DropdownTrigger>
        <Avatar
          src={image}
          name={name}
          size="sm"
          as="button"
          showFallback
          icon={image && <AvatarIcon />}
          classNames={{
            base: "bg-gradient-to-br from-[#55a3fd] to-[#006FEE]",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        disabledKeys={["account"]}
        className="py-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownItem
          key="account"
          className="h-14 gap-2 opacity-100"
          textValue="myaccount"
          isReadOnly
        >
          <User
            avatarProps={{
              size: "sm",
              src: image,
            }}
            classNames={{
              name: "text-default-600",
              description: "text-default-500",
            }}
            description={email}
            name={name}
          />
        </DropdownItem>
        <DropdownItem
          key="profile"
          textValue="profile"
          onPress={() => {
            router.push("/user/profile");
          }}
        >
          My Profile
        </DropdownItem>
        <DropdownItem
          key="settings"
          textValue="settings"
          onPress={() => {
            router.push("/user/profile#settings");
          }}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          key="bookmarks"
          textValue="bookmarks"
          onPress={() => {
            router.push("/user/profile#bookmarks");
          }}
        >
          Bookmarks
        </DropdownItem>
        <DropdownItem
          key="history"
          textValue="history"
          onPress={() => {
            router.push("/user/profile#history");
          }}
        >
          History
        </DropdownItem>
        <DropdownItem
          key="help_and_feedback"
          textValue="help_and_feedback"
          onPress={() => {
            router.push("/user/help-feedback");
          }}
        >
          Help & Feedback
        </DropdownItem>
        <DropdownItem
          key="signout"
          color="danger"
          textValue="signout"
          onPress={() => signOut()}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarMenu;
