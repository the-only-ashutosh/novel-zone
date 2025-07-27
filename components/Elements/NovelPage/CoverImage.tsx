"use client";
import { Skeleton } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";

const CoverImage = ({
  src,
  title,
  width,
}: {
  src: string;
  title: string;
  width: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`overflow-clip rounded-lg`}
      style={{
        minHeight: `${width / 0.75}px`,
        minWidth: `${width}px`,
        maxHeight: `${width / 0.75}px`,
        maxWidth: `${width}px`,
      }}
    >
      <Image
        id="cover-image"
        src={src}
        alt={title}
        width={width}
        height={width / 0.75}
        style={{
          objectFit: "cover",
        }}
        className={`rounded-lg transition-transform duration-300 transform ${
          isHovering ? "scale-125" : "scale-100"
        } ${loading ? "-z-10" : "z-10"}`}
        priority
        onLoad={() => setLoading(false)}
      />
      <Skeleton
        style={{
          minHeight: `${width / 0.75}px`,
          minWidth: `${width}px`,
          maxHeight: `${width / 0.75}px`,
          maxWidth: `${width}px`,
          zIndex: loading ? 10 : -10,
          display: loading ? "flex" : "none",
        }}
        className="rounded-lg"
      />
    </div>
  );
};

export default CoverImage;
