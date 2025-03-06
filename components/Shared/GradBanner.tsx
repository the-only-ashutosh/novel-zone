import React, { ReactNode } from "react";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

const GradBanner = ({
  children,
  main,
  sub,
}: {
  children: ReactNode;
  main: string;
  sub: string;
}) => {
  return (
    <div className="flex flex-col items-center py-4 mx-[5%] w-[90%]">
      <div className="heading_main w-full mb-5 rounded-md bg-gradient-to-r from-blue-700 via-teal-500 to-green-300 pl-2 pb-1 z-10">
        <div className="px-2 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 rounded-tr-md rounded-bl-md">
          <div>
            <h3 className="font-semibold main_heading_h3">{main}</h3>
            <p className="mb-1 main_heading_p">{sub}</p>
          </div>
          <SortRoundedIcon className="mx-2 text-gray-600 hover:text-gray-800" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default GradBanner;
