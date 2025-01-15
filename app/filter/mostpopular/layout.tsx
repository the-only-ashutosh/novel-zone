import React from "react";

const MostPopularLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

export default MostPopularLayout;
export const revalidate = 0;
