"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  Input,
  ModalBody,
  useDisclosure,
  Kbd,
} from "@nextui-org/react";
import Fade from "@mui/material/Fade";
import { IconButton } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { SearchIcon } from "../UI/SearchIcon";
import SearchList from "../Elements/SearchModal/SearchList";

export default function SearchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <>
      <Input
        className="modeswitch"
        classNames={{
          base: "max-w-full sm:max-w-[10rem] h-10",
          mainWrapper: "h-full",
          input: "text-xs",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        onClick={onOpen}
        isReadOnly
        endContent={<Kbd keys={["ctrl"]}>K</Kbd>}
      />
      <div className="searchicon">
        <IconButton
          className="searchicon text-gray-600 dark:text-white"
          onClick={onOpen}
        >
          <FiSearch size={24} />
        </IconButton>
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
                      onOpenChange();
                      setSearch("");
                    }}
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
