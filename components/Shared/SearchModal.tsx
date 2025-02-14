"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  Input,
  ModalBody,
  useDisclosure,
  Kbd,
  Button,
} from "@heroui/react";
import Fade from "@mui/material/Fade";
import SearchList from "../Elements/SearchModal/SearchList";
import type { SVGProps } from "react";

export function IconParkSearch(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="none" strokeLinejoin="round" strokeWidth={4}>
        <path
          fill="#2f88ff"
          stroke="#333"
          d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
        ></path>
        <path
          stroke="#fff"
          strokeLinecap="round"
          d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431"
        ></path>
        <path
          stroke="#333"
          strokeLinecap="round"
          d="M33.2216 33.2217L41.7069 41.707"
        ></path>
      </g>
    </svg>
  );
}

export default function SearchModal({
  viewport,
}: Readonly<{ viewport: string }>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const w = window.innerWidth;
      if (w > 687 && event.ctrlKey && event.key === "k") {
        event.preventDefault();
        onOpen();
        localStorage.setItem("search", "true");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <>
      <Button
        disableRipple
        className="data-[hover=true]:bg-transparent hidden xl:flex bg-default-400/20 dark:bg-default-500/20 text-default-500 h-10"
        startContent={<IconParkSearch width={20} />}
        endContent={
          <Kbd
            keys={["ctrl"]}
            classNames={{
              base: "bg-white dark:bg-black",
            }}
          >
            K
          </Kbd>
        }
        onPress={() => {
          localStorage.setItem("search", "true");
          onOpen();
        }}
      >
        Search...
      </Button>
      <div className="hidden lg:flex">
        <Button
          className="data-[hover=true]:bg-transparent bg-transparent h-10"
          disableRipple
          isIconOnly
          onPress={() => {
            localStorage.setItem("search", "true");
            onOpen();
          }}
          startContent={<IconParkSearch width={24} />}
        />
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        hideCloseButton
        placement="center"
        size="xl"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={() => {
          localStorage.setItem("search", "false");
          onOpenChange();
          setSearch("");
        }}
      >
        <ModalContent>
          {() => (
            <ModalBody className="px-0 pt-0 min-h-[320px] max-h-[320px] flex-col">
              <Input
                isClearable
                classNames={{
                  base: "min-w-full sm:max-w-[10rem] h-[56px]",
                  mainWrapper: "h-full rounded-b-none border-b-sm",
                  input: "text-medium",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-b-none",
                }}
                type="search"
                placeholder="Search Novels..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onClear={() => {
                  setSearch("");
                }}
                onFocusChange={(bool) => {
                  if (!bool) {
                    setTimeout(() => {
                      setFocus(bool);
                    }, 200);
                    return;
                  }
                  setFocus(bool);
                }}
                autoFocus
              />
              <Fade in={focus}>
                <div className="w-full flex justify-center">
                  <SearchList
                    toSearch={search}
                    closeModal={() => {
                      localStorage.setItem("search", "false");
                      onOpenChange();
                      setSearch("");
                    }}
                    viewport={viewport}
                  />
                </div>
              </Fade>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
