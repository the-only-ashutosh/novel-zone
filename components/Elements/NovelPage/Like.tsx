"use client";
import React, { useState } from "react";
import { ColorHeart, LineHeart } from "@/components/icons";
import { Button } from "@heroui/react";

const Like = ({
  book,
  number,
  likes,
}: {
  book: string;
  number: number;
  likes: number;
}) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex justify-center items-center min-w-20 flex-col">
      <Button
        isIconOnly
        disableRipple
        variant="light"
        className="data-[hover=true]:bg-transparent w-6 h-6"
        disabled={liked}
        onPress={async () => {
          const axios = (await import("axios")).default;
          const status: string = await axios
            .post("/api/data/addLike", { book, number })
            .then((res) => res.data);
          if (status === "Success") {
            setLiked(true);
          }
        }}
      >
        {liked ? (
          <ColorHeart width={24} height={24} />
        ) : (
          <LineHeart width={24} height={24} />
        )}
      </Button>
      <h4 className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#f97dbd] to-[#d7257d]">
        {liked ? likes + 1 : likes}
      </h4>
    </div>
  );
};

export default Like;
