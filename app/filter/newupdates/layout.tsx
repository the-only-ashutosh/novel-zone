import React from "react";

const NewUpdatesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="py-4">{children}</div>;
};

export default NewUpdatesLayout;

export const revalidate = 0;
