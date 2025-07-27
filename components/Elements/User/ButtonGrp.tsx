"use client";
import React, { useState } from "react";
import type { ReactElement, SVGProps } from "react";
import { Listbox, ListboxItem, ListboxSection, cn } from "@heroui/react";
import { usePathname } from "next/navigation";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import {
  MingcuteUser4Line,
  PhBookBookmarkBold,
  StreamlineDashboard3Solid,
} from "./Icons";

const ButtonGrp = () => {
  const [selected, setSelected] = useState(usePathname().split("/")[2]);
  const [hover, setHover] = useState(0);
  const iconClasses =
    "text-xl text-default-500 pointer-events-none shrink-0 w-6 h-6";
  return (
    <ListboxWrapper>
      <Listbox
        aria-label="User Action List"
        variant="flat"
        color="primary"
        selectedKeys={new Set([selected])}
      >
        <ListboxSection showDivider title="Options" className="my-2">
          <ListboxItem
            key="dashboard"
            startContent={
              <StreamlineDashboard3Solid
                className={cn(
                  iconClasses,
                  `${
                    selected.includes("dashboard") || hover === 1
                      ? "text-primary"
                      : ""
                  }`
                )}
              />
            }
            href="/user/dashboard"
            description="User Dashboard"
            onPress={() => setSelected("dashboard")}
            onMouseOver={() => setHover(1)}
            onMouseLeave={() => setHover(0)}
            className="hover:text-primary"
            classNames={
              selected.includes("dashboard") || hover === 1
                ? {
                    base: "bg-primary bg-opacity-20 mb-1",
                    title: "text-primary",
                    description: "text-primary",
                  }
                : {
                    base: "mb-1",
                  }
            }
          >
            Dashboard
          </ListboxItem>
          <ListboxItem
            key="profile"
            startContent={
              <MingcuteUser4Line
                className={cn(
                  iconClasses,
                  `${
                    selected.includes("profile") || hover === 2
                      ? "text-primary"
                      : ""
                  }`
                )}
              />
            }
            href="/user/profile"
            description="Your Profile"
            onPress={() => setSelected("profile")}
            onMouseOver={() => setHover(2)}
            className="hover:text-primary"
            onMouseLeave={() => setHover(0)}
            classNames={
              selected.includes("profile") || hover === 2
                ? {
                    base: "bg-primary bg-opacity-20 my-1",
                    title: "text-primary",
                    description: "text-primary",
                  }
                : {
                    base: "my-1",
                  }
            }
          >
            Profile
          </ListboxItem>
          <ListboxItem
            key="bookmark"
            startContent={
              <PhBookBookmarkBold
                className={cn(
                  iconClasses,
                  `${
                    selected.includes("bookmark") || hover === 3
                      ? "text-primary"
                      : ""
                  }`
                )}
              />
            }
            href="/user/bookmark"
            description="Books Bookmarked"
            onPress={() => setSelected("bookmark")}
            onMouseOver={() => setHover(3)}
            onMouseLeave={() => setHover(0)}
            className="hover:text-primary"
            classNames={
              selected.includes("bookmark") || hover === 3
                ? {
                    base: "bg-primary bg-opacity-20 my-1",
                    title: "text-primary",
                    description: "text-primary",
                  }
                : {
                    base: "my-1",
                  }
            }
          >
            Bookmarks
          </ListboxItem>
          <ListboxItem
            key="history"
            startContent={
              <ManageHistoryRoundedIcon
                className={cn(
                  iconClasses,
                  `${
                    selected.includes("history") || hover === 4
                      ? "text-primary"
                      : ""
                  }`
                )}
              />
            }
            href="/user/history"
            description="Reading History"
            onPress={() => setSelected("history")}
            onMouseOver={() => setHover(4)}
            onMouseLeave={() => setHover(0)}
            className="hover:text-primary"
            classNames={
              selected.includes("history") || hover === 4
                ? {
                    base: "bg-primary bg-opacity-20 my-1",
                    title: "text-primary",
                    description: "text-primary",
                  }
                : {
                    base: "my-1",
                  }
            }
          >
            History
          </ListboxItem>
          <ListboxItem
            key="settings"
            startContent={
              <SettingsSuggestRoundedIcon
                className={cn(
                  iconClasses,
                  `${
                    selected.includes("settings") || hover === 5
                      ? "text-primary"
                      : ""
                  }`
                )}
                fontSize="medium"
                //
                //
              />
            }
            description="Website Settings"
            href="/user/settings"
            onPress={() => setSelected("settings")}
            onMouseOver={() => setHover(5)}
            onMouseLeave={() => setHover(0)}
            className="hover:text-primary"
            classNames={
              selected.includes("settings") || hover === 5
                ? {
                    base: "bg-primary bg-opacity-20 mt-1",
                    title: "text-primary",
                    description: "text-primary",
                  }
                : {
                    base: "mt-1",
                  }
            }
          >
            Settings
          </ListboxItem>
        </ListboxSection>
        <ListboxSection title="Danger zone">
          <ListboxItem
            key="delete account"
            className="text-danger"
            color="danger"
            description="Delete Account"
            href="/user/deleteaccount"
            startContent={
              <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
            }
          >
            Delete
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </ListboxWrapper>
  );
};

export const ListboxWrapper = ({ children }: { children: ReactElement }) => (
  <div className="w-full max-w-[260px] border-t-small px-1 py-2 rounded-bl-small border-default-200 dark:border-white">
    {children}
  </div>
);

export const DeleteDocumentIcon = (
  props: Readonly<SVGProps<SVGSVGElement>>
) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ButtonGrp;
