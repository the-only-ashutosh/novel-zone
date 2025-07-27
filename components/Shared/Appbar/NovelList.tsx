"use client";
import React from "react";
import { DropdownItem, DropdownMenu } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ProgressBarLink } from "../Progressbar/progress-bar";

const NovelList = ({ loc }: { loc: string }) => {
  const router = useRouter();
  return (
    <DropdownMenu
      classNames={{
        base: "max-w-full",
      }}
      itemClasses={{
        base: [
          "gap-4",
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
        key={"allnovels"}
        onPress={() => {
          router.push("/filter/allnovels");
        }}
        textValue="allnovels"
      >
        <ProgressBarLink
          aria-current={loc === "/filter/allnovels" || "page"}
          color={loc === "/filter/allnovels" ? "primary" : "foreground"}
          href="/filter/allnovels"
        >
          All Novels
        </ProgressBarLink>
      </DropdownItem>
      <DropdownItem
        key={"hotnovels"}
        onPress={() => {
          router.push("/filter/hotnovels");
        }}
        textValue="hotnovels"
      >
        <ProgressBarLink
          aria-current={loc === "/filter/hotnovels" || "page"}
          color={loc === "/filter/hotnovels" ? "primary" : "foreground"}
          href="/filter/hotnovels"
        >
          Hot Novels
        </ProgressBarLink>
      </DropdownItem>
      <DropdownItem
        key={"newupdates"}
        onPress={() => {
          router.push("/filter/newupdates");
        }}
        textValue="newupdates"
      >
        <ProgressBarLink
          aria-current={loc === "/filter/newupdates" || "page"}
          color={loc === "/filter/newupdates" ? "primary" : "foreground"}
          href="/filter/newupdates"
        >
          New Updates
        </ProgressBarLink>
      </DropdownItem>
      <DropdownItem
        key={"completed"}
        onPress={() => {
          router.push("/filter/completed");
        }}
        textValue="completed"
      >
        <ProgressBarLink
          aria-current={loc === "/filter/completed" || "page"}
          color={loc === "/filter/completed" ? "primary" : "foreground"}
          href="/filter/completed"
        >
          Completed
        </ProgressBarLink>
      </DropdownItem>
      <DropdownItem
        key={"mostpopular"}
        onPress={() => {
          router.push("/filter/mostpopular");
        }}
        textValue="mostpopular"
      >
        <ProgressBarLink
          aria-current={loc === "/filter/mostpopular" || "page"}
          color={loc === "/filter/mostpopular" ? "primary" : "foreground"}
          href="/filter/mostpopular"
        >
          Most Popular
        </ProgressBarLink>
      </DropdownItem>
    </DropdownMenu>
  );
};

export default NovelList;
