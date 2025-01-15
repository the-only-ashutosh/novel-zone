"use server";
import { getVar } from "@/service/fonts";
import React from "react";

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
  return (
    <div
      id="content-page"
      className={`mx-[5%] sm:mx-[2%] md:mx-[3.5%] max-w-[-moz-available] my-6 ${getVar(
        fStyle
      )}`}
      style={{ fontSize: `${fSize}px`, lineHeight: "160%", marginTop: "15px" }}
    >
      <h2 className="mb-[12px] font-bold text-2xl dark:text-[#F5F5F5]">
        {title}
      </h2>
      {content.map((para, i) => {
        return (
          <p
            key={`paraatindex${i}`}
            className="mb-[10px] font-medium dark:text-[#f5f5f5ba]"
          >
            {para}
          </p>
        );
      })}
    </div>
  );
};

export default ChapterContent;
