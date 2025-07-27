"use client";
import { setCookie, getCookie } from "cookies-next/client";
import { useEffect } from "react";

export function TrackBook({ bookId }: Readonly<{ bookId: number }>) {
  useEffect(() => {
    const viewed = getCookie("viewedBooks");
    const viewedArray = viewed ? JSON.parse(viewed) : [];

    if (!viewedArray.includes(bookId)) {
      viewedArray.push(bookId);
      setCookie("viewedBooks", JSON.stringify(viewedArray), {
        expires: new Date(new Date().getTime() + 3600 * 24 * 7),
      }); // 7 days
    }
  }, [bookId]);
  return <></>;
}
