import React from "react";

const HotNovelsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default HotNovelsLayout;

export const revalidate = 0;
