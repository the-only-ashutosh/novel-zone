import React from "react";
import "@/service/fonts";

const ChapterLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-[2.5%] py-[2%]  dark:bg-[#121212]">{children}</div>;
};

export default ChapterLayout;
