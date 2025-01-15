"use client";
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Pages = ({ url, totalPages }: { url: string; totalPages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const page = Number(pathname.split("/")[pathname.split("/").length - 1]);
  return (
    <Pagination
      total={totalPages}
      color="primary"
      onChange={(page) => {
        router.push(`${url}/${page}`);
      }}
      isCompact
      showControls
      className="mt-4"
      initialPage={isNaN(page) ? 1 : page}
      page={isNaN(page) ? 1 : page}
    />
  );
};

export default Pages;
