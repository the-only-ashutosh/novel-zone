/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect } from "react";
import ChangeButtons from "./ChangeButtons";
import { useRouter } from "next/navigation";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SelectList from "./SelectList";

const ChangeChapters = ({
  book_name,
  prevUrl,
  nextUrl,
  currentCh,
  device,
}: {
  book_name: string;
  prevUrl: string;
  nextUrl: string;
  currentCh: number;
  device: string;
}) => {
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "z" && prevUrl) {
        event.preventDefault();
        router.push(prevUrl);
      }
      if (event.key === "n" && nextUrl) {
        event.preventDefault();
        router.push(nextUrl);
      }
      if (event.key === "ArrowLeft" && prevUrl) {
        event.preventDefault();
        router.push(prevUrl);
      }
      if (event.key === "ArrowRight" && nextUrl) {
        event.preventDefault();
        router.push(nextUrl);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });
  return (
    <div className="flex flex-row">
      <ChangeButtons
        href={`/book/${book_name}/${prevUrl}`}
        isDisabled={prevUrl === null}
      >
        {device === "desktop" && (
          <>
            <ChevronLeftRoundedIcon className="pt-[3.5px]" />
            Prev Chapter
          </>
        )}
        {device === "mobile" && (
          <ChevronLeftRoundedIcon className="pt-[3.5px]" />
        )}
      </ChangeButtons>
      <SelectList book_name={book_name} current={currentCh} />
      <ChangeButtons
        href={`/book/${book_name}/${nextUrl}`}
        isDisabled={nextUrl === null}
      >
        {device === "desktop" && (
          <>
            Next Chapter
            <ChevronRightRoundedIcon className="pt-[3.5px]" />
          </>
        )}
        {device === "mobile" && (
          <ChevronRightRoundedIcon className="pt-[3.5px]" />
        )}
      </ChangeButtons>
    </div>
  );
};

export default ChangeChapters;
