import { Avatar, AvatarIcon } from "@heroui/react";
import React from "react";

const AvatarComp = ({ image, name }: { image: string; name: string }) => {
  return (
    <Avatar
      src={image}
      name={name}
      classNames={{
        base: "w-24 h-24 text-large mb-4",
        fallback:
          "bg-gradient-to-br from-[#55a3fd] to-[#006FEE] w-24 h-24 text-black/80",
      }}
      fallback={<AvatarIcon />}
      showFallback
    />
  );
};

export default AvatarComp;
