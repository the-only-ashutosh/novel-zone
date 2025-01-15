import React from "react";

const CompletedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="py-4">{children}</div>;
};

export default CompletedLayout;

export const revalidate = 0;
