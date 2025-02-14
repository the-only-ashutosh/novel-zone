"use client";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { FaList } from "react-icons/fa";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Backdrop from "@mui/material/Backdrop";
import { Button, Input, Listbox, ListboxItem, Spinner } from "@heroui/react";
import React, { ReactElement, useEffect, useState } from "react";
import ChangeButtons from "./ChangeButtons";
import { useRouter } from "next/navigation";

type Chapter = {
  url: string;
  number: number;
  title: string;
};

const SelectChapterList = ({
  book_name,
  current,
  prevUrl,
  nextUrl,
  device,
}: {
  book_name: string;
  current: number;
  prevUrl: string;
  nextUrl: string;
  device: string;
}) => {
  const [dataset, setDataset] = useState<Array<Chapter>>([]);
  const [toSearch, setToSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(current);
  const [searching, setSearching] = useState(false);
  const [value, setValue] = React.useState(new Set([""]));
  const [inputFocus, setInputFocus] = useState(false);
  const [dataFetching, setDataFetching] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const li = document.getElementById(String(selected));
    if (li && open) {
      li.scrollIntoView({ behavior: "smooth" });
    }
  }, [selected, open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (localStorage.getItem("search") !== "true") {
        if (event.key === "z" && prevUrl) {
          event.preventDefault();

          document.getElementById("prevButton")!.click();
        }
        if (event.key === "n" && nextUrl) {
          event.preventDefault();
          document.getElementById("nextButton")!.click();
        }
        if (event.key === "ArrowLeft" && prevUrl) {
          event.preventDefault();
          document.getElementById("prevButton")!.click();
        }
        if (event.key === "ArrowRight" && nextUrl) {
          event.preventDefault();
          document.getElementById("nextButton")!.click();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <ChangeButtons
          isDisabled={prevUrl === null}
          id="prevButton"
          href={`/book/${book_name}/${prevUrl}`}
        >
          {device === "desktop" && (
            <>
              <KeyboardArrowLeftRoundedIcon className="pt-[3.5px]" />
              Prev Chapter
            </>
          )}
          {device === "mobile" && (
            <KeyboardArrowLeftRoundedIcon className="pt-[3.5px]" />
          )}
        </ChangeButtons>
        {dataset.length === 0 ? (
          <Button
            isIconOnly
            disableRipple
            radius="sm"
            color="primary"
            className="rounded-sm"
            onPress={async () => {
              setDataFetching(true);
              const axios = (await import("axios")).default;
              await axios
                .post("/api/data/getChaptersList", { book: book_name })
                .then(
                  ({
                    data,
                  }: {
                    data: { message: string; content: Array<Chapter> };
                  }) => {
                    if (data.message === "Success") {
                      setValue(
                        new Set([
                          String(
                            data.content.filter((x) => x.number === current)[0]
                              .title
                          ),
                        ])
                      );
                      setDataset(data.content);
                    }
                  }
                );
            }}
          >
            {dataFetching ? <Spinner size="sm" color="white" /> : <FaList />}
          </Button>
        ) : (
          <Button
            className="bg-primary w-[173px] text-white data-[hover=true]:bg-primary rounded-sm"
            disableRipple
            radius="sm"
            color="primary"
            endContent={
              <KeyboardArrowLeftRoundedIcon
                style={{
                  transform: open ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                  marginTop: "2px",
                }}
                fontSize="small"
              />
            }
            onPress={() => {
              setOpen((prev) => !prev);
            }}
          >
            <p className="truncate h-5">{value.values().toArray()[0]}</p>
          </Button>
        )}
        <ChangeButtons
          isDisabled={nextUrl === null}
          id="nextButton"
          href={`/book/${book_name}/${nextUrl}`}
        >
          {device === "desktop" && (
            <>
              Next Chapter
              <KeyboardArrowRightRoundedIcon className="pt-[3.5px]" />
            </>
          )}
          {device === "mobile" && (
            <KeyboardArrowRightRoundedIcon className="pt-[3.5px]" />
          )}
        </ChangeButtons>
      </div>
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={() => {
          if (!inputFocus) {
            setOpen((prev) => !prev);
          }
        }}
      >
        <ListboxWrapper>
          <Input
            variant="bordered"
            placeholder="Search..."
            classNames={{
              base: "rounded-sm border-default-200 dark:border-default-100 bg-transparent",
              input: [
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "rounded-sm ",
              inputWrapper: "rounded-sm",
            }}
            isClearable
            endContent={
              toSearch.length > 0 && searching && <Spinner size="sm" />
            }
            value={toSearch}
            onValueChange={(e) => {
              if (!searching) {
                setSearching(true);
                setTimeout(() => {
                  setSearching(false);
                }, 1500);
              }
              setToSearch(e);
            }}
            onFocusChange={(f) => {
              if (f) {
                localStorage.setItem("search", "true");
              } else {
                localStorage.setItem("search", "false");
              }
              setInputFocus(f);
            }}
          />
          <Listbox
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={value}
            label="Chapters list"
            className="max-w-xs"
            classNames={{ list: "h-[360px] overflow-scroll" }}
          >
            {dataset
              .filter((x) =>
                x.title.toLowerCase().includes(toSearch.toLowerCase())
              )
              .map((item) => (
                <ListboxItem
                  key={String(item.title)}
                  value={item.title}
                  id={String(item.number)}
                  classNames={{
                    base: `data-[hover=true]:bg-primary rounded-sm data-[hover=true]:text-white h-8 ${
                      selected === item.number ? "bg-primary text-white" : ""
                    } data-[selectable=true]:focus:bg-primary data-[selectable=true]:focus:text-white`,
                  }}
                  onPress={() => {
                    setSelected(item.number);
                    setValue(new Set([item.title]));
                    router.push(`/book/${book_name}/${item.url}`);
                  }}
                >
                  {item.title}
                </ListboxItem>
              ))}
          </Listbox>
        </ListboxWrapper>
      </Backdrop>
    </div>
  );
};

const ListboxWrapper = ({ children }: { children: ReactElement[] }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-sm border-default-200 dark:border-default-100 dark:bg-black bg-white">
    {children}
  </div>
);

export default SelectChapterList;
