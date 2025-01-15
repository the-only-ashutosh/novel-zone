import React from "react";

const CategoriesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default CategoriesLayout;

export const revalidate = 0;
