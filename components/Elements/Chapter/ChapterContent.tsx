"use server";
import React from "react";
import TopAd from "./TopAd";
import MiddleAd from "./MiddleAd";
import EndAd from "./EndAd";
import { fonts, FontKey } from "@/service/fonts";

const ChapterContent = ({
  title,
  content,
  fStyle,
  fSize,
}: {
  title: string;
  content: string[];
  fStyle: string;
  fSize: string;
}) => {
  const selectedFont: FontKey = [
    "Slabo",
    "Rubik",
    "Roboto",
    "PlayWrite",
    "Opensans",
    "Josefins",
    "Inter",
    "HindMysuru",
    "Exo2",
    "Caveat",
  ].includes(fStyle as FontKey)
    ? (fStyle as FontKey)
    : "Rubik";
  const font = fonts[selectedFont];
  return (
    <div
      id="content-page"
      className={`my-10 ${font.variable} mx-[5%] w-[80vw]`}
      style={{ fontSize: `${fSize}px`, lineHeight: "160%" }}
    >
      <h2 className="mb-[12px] font-bold text-2xl dark:text-[#F5F5F5]">
        {title}
      </h2>
      {content.map((para, i) => {
        if (i === 0) {
          return (
            <TopAd
              key={`paraatindex${i}${para.slice(0, 10)}`}
              para={
                <p
                  key={`paraatindex${i}${para.slice(0, 10)}`}
                  className="mb-[10px] font-medium dark:text-[#f5f5f5ba] w-full"
                >
                  {para}
                </p>
              }
            />
          );
        } else if (i === Math.ceil(content.length / 2)) {
          return (
            <MiddleAd
              key={`paraatindex${i}${para.slice(0, 10)}`}
              para={
                <p className="mb-[10px] font-medium dark:text-[#f5f5f5ba] w-full">
                  {para}
                </p>
              }
            />
          );
        } else if (i === content.length - 1) {
          return (
            <EndAd
              key={`paraatindex${i}${para.slice(0, 10)}`}
              para={
                <p className="mb-[10px] font-medium dark:text-[#f5f5f5ba] w-full">
                  {para}
                </p>
              }
            />
          );
        } else {
          return (
            <p
              key={`paraatindex${i}${para.slice(0, 10)}`}
              className="mb-[10px] font-medium dark:text-[#f5f5f5ba] w-full"
            >
              {para}
            </p>
          );
        }
      })}
    </div>
  );
};

export default ChapterContent;
