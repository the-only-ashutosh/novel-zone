"use server";
import { getVar } from "@/service/fonts";
import Script from "next/script";
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
      className={`my-10 ${getVar(fStyle)} mx-[5%] w-[80vw]`}
      style={{ fontSize: `${fSize}px`, lineHeight: "160%" }}
    >
      <h2 className="mb-[12px] font-bold text-2xl dark:text-[#F5F5F5]">
        {title}
      </h2>
      {content.map((para, i) => {
        if (i === 0) {
          return (
            <>
              <div id="yandex_rtb_R-A-14241249-1"></div>
              <Script id="">
                {`window.yaContextCb.push(() => {
                  Ya.Context.AdvManager.render({
                  "blockId": "R-A-14241249-1",
                  "renderTo": "yandex_rtb_R-A-14241249-1"
                    })
                  })`}
              </Script>
              <p
                key={`paraatindex${i}${para.slice(0, 10)}`}
                className="mb-[10px] font-medium dark:text-[#f5f5f5ba] w-full"
              >
                {para}
              </p>
            </>
          );
        } else if (i === Math.ceil(content.length / 2)) {
          return (
            <>
              <div id="yandex_rtb_R-A-14241249-2"></div>
              <Script id="">
                {`window.yaContextCb.push(() => {
                  Ya.Context.AdvManager.render({
                  "blockId": "R-A-14241249-2",
                  "renderTo": "yandex_rtb_R-A-14241249-2"
                    })
                  })`}
              </Script>
              <p
                key={`paraatindex${i}${para.slice(0, 10)}`}
                className="mb-[10px] font-medium dark:text-[#f5f5f5ba] w-full"
              >
                {para}
              </p>
            </>
          );
        } else if (i === content.length - 1) {
          return (
            <>
              <div id="yandex_rtb_R-A-14241249-3"></div>
              <Script id="">
                {`window.yaContextCb.push(() => {
                  Ya.Context.AdvManager.render({
                  "blockId": "R-A-14241249-3",
                  "renderTo": "yandex_rtb_R-A-14241249-3"
                    })
                  })`}
              </Script>
              <p
                key={`paraatindex${i}${para.slice(0, 10)}`}
                className="mb-[10px] font-medium dark:text-[#f5f5f5ba] w-full"
              >
                {para}
              </p>
            </>
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
