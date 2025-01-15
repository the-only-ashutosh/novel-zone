"use client";
import React from "react";
import { DropdownItem, DropdownMenu } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NovelList = ({ loc }: { loc: string }) => {
  const router = useRouter();
  return (
    <DropdownMenu
      classNames={{
        base: "max-w-full",
      }}
      itemClasses={{
        base: "gap-4",
      }}
    >
      <DropdownItem
        key={"allnovels"}
        onPress={() => {
          router.push("/filter/allnovels");
        }}
      >
        <Link
          aria-current={loc === "/filter/allnovels" || "page"}
          color={loc === "/filter/allnovels" ? "primary" : "foreground"}
          href="/filter/allnovels"
        >
          All Novels
        </Link>
      </DropdownItem>
      <DropdownItem
        key={"hotnovels"}
        onPress={() => {
          router.push("/filter/hotnovels");
        }}
      >
        <Link
          aria-current={loc === "/filter/hotnovels" || "page"}
          color={loc === "/filter/hotnovels" ? "primary" : "foreground"}
          href="/filter/hotnovels"
        >
          Hot Novels
        </Link>
      </DropdownItem>
      <DropdownItem
        key={"newupdates"}
        onPress={() => {
          router.push("/filter/newupdates");
        }}
      >
        <Link
          aria-current={loc === "/filter/newupdates" || "page"}
          color={loc === "/filter/newupdates" ? "primary" : "foreground"}
          href="/filter/newupdates"
        >
          New Updates
        </Link>
      </DropdownItem>
      <DropdownItem
        key={"completed"}
        onPress={() => {
          router.push("/filter/completed");
        }}
      >
        <Link
          aria-current={loc === "/filter/completed" || "page"}
          color={loc === "/filter/completed" ? "primary" : "foreground"}
          href="/filter/completed"
        >
          Completed
        </Link>
      </DropdownItem>
      <DropdownItem
        key={"mostpopular"}
        onPress={() => {
          router.push("/filter/mostpopular");
        }}
      >
        <Link
          aria-current={loc === "/filter/mostpopular" || "page"}
          color={loc === "/filter/mostpopular" ? "primary" : "foreground"}
          href="/filter/mostpopular"
        >
          Most Popular
        </Link>
      </DropdownItem>
    </DropdownMenu>
  );
};

export default NovelList;
