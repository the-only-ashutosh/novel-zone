"use client";
import { Button } from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "../icons";

const BackToTop = () => {
  const [pos, setPos] = useState(0);
  const pageHeight = useRef(0);
  useEffect(() => {
    pageHeight.current = window.visualViewport!.pageTop;
    const handleScroll = () => {
      setPos(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <Button
      isIconOnly
      radius="full"
      disableRipple
      //   className={`data-[hover=true]:bg-primary data-[hover=true]:opacity-100 nextjs-toast`}
      className={`${
        pos > 350 ? "" : "hidden"
      } fixed bottom-6 right-[1%] md:right-[4%] sm:right-[4%] data-[hover=true]:bg-primary data-[hover=true]:opacity-100 z-1000 w-10 h-10`}
      color="primary"
      onPress={() => {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      }}
    >
      <ArrowUp width={24} height={24} />
    </Button>
  );
};

export default BackToTop;
