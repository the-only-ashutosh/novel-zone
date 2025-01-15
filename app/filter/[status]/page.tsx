import { notFound } from "next/navigation";
import React from "react";

const StatusPage = async ({
  params,
}: {
  params: Promise<{ status: string }>;
}) => {
  const { status } = await params;
  const allStatus = ["completed", "ongoing", "dropped"];

  return (
    <div>
      {allStatus.filter((x) => x === status.toLowerCase()).length > 0
        ? status
        : notFound()}
    </div>
  );
};

export default StatusPage;
