"use client";
import React, { useEffect } from "react";
import ChangeButtons from "./ChangeButtons";
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
    <div className="flex flex-row">
      <ChangeButtons
        isDisabled={prevUrl === null}
        id="prevButton"
        href={`/book/${book_name}/${prevUrl}`}
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
        isDisabled={nextUrl === null}
        id="nextButton"
        href={`/book/${book_name}/${nextUrl}`}
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
