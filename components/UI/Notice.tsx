"use client";
import React, { useEffect, useState } from "react";
import { ColorDismiss } from "../icons";
import { getCookie, setCookie } from "cookies-next/client";

const Notice = () => {
  const [visible, setVisible] = useState<string | undefined>("false");
  useEffect(() => {
    const seen = getCookie("seen");
    if (seen !== "false") {
      setVisible(seen);
    }
  }, []);

  return (
    <div
      className={`${
        visible === "false" ? "hidden" : ""
      } px-5 py-3 rounded-lg bg-gradient-to-br from-primary via-primary/85 to-primary/70 mx-[5%] my-3 text-white flex flex-row justify-between items-center xl:text-lg lg:text-medium`}
      style={{ fontSize: "1.09rem", lineHeight: "1.75rem" }}
    >
      We are migrating our servers, so you might notice missing content and
      chapters. This migration will be finished by 29-03-2025 21:00 UTC.
      <ColorDismiss
        className="ml-4 w-6 h-6 xl:w-8 xl:h-8 lg:w-8 lg:h-8"
        onClick={() => {
          setCookie("seen", "false");
          setVisible("false");
        }}
      />
    </div>
  );
};

export default Notice;
