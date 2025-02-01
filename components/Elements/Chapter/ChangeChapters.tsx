"use client";
import React, { useEffect } from "react";
import ChangeButtons from "./ChangeButtons";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SelectList from "./SelectList";
import Link from "next/link";

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
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
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
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });
  return (
    <div className="flex flex-row">
      <Link href={`/book/${book_name}/${prevUrl}`} prefetch>
        <ChangeButtons isDisabled={prevUrl === null} id="prevButton">
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
      </Link>
      <SelectList book_name={book_name} current={currentCh} />
      <Link href={`/book/${book_name}/${nextUrl}`} prefetch>
        <ChangeButtons isDisabled={nextUrl === null} id="nextButton">
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
      </Link>
    </div>
  );
};

export default ChangeChapters;
