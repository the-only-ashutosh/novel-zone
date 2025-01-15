"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const Button = dynamic(
  () => import("@nextui-org/react").then((mod) => mod.Button),
  { ssr: false }
);

const ViewMoreButton = ({ url }: { url: string }) => {
  const route = useRouter();
  return (
    <Button
      className="text-small rounded-md px-0"
      color="primary"
      onPress={() => {
        route.push(url, { scroll: true });
      }}
    >
      View More
    </Button>
  );
};

export default ViewMoreButton;
