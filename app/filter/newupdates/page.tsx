import React, { Suspense } from "react";
import GradBanner from "@/components/Shared/GradBanner";
import NewUpdatesList from "@/components/Elements/NewUpdates/NewUpdatesList";
import NewUpdatesSkeleton from "@/components/Elements/NewUpdates/NewUpdatesSkeleton";

export const experimental_ppr = true;

const NewUpdates = () => {
  return (
    <div className="flex items-center">
      <GradBanner main="New Updates" sub="Recent Updated Chapters">
        <Suspense fallback={<NewUpdatesSkeleton />}>
          <NewUpdatesList />
        </Suspense>
      </GradBanner>
    </div>
  );
};

export default NewUpdates;
