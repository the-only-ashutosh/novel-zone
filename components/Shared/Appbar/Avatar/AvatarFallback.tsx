"use client";
import { Avatar, AvatarIcon } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AvatarFallback = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/auth/signin");
  });
  const pathn = usePathname();
  return (
    <Avatar
      classNames={{
        base: "bg-gradient-to-br from-[#55a3fd] to-[#006FEE]",
        icon: "text-black/80",
      }}
      size="sm"
      icon={<AvatarIcon />}
      as={"button"}
      onClick={() => {
        if (!pathn.startsWith("/auth/signin")) {
          router.push(`/auth/signin`);
        }
      }}
    />
  );
};

export default AvatarFallback;
