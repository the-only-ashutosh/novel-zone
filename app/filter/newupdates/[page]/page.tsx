import React, { Suspense } from "react";
import GradBanner from "@/components/Shared/GradBanner";
import NewUpdatesList from "@/components/Elements/NewUpdates/NewUpdatesList";
import NewUpdatesSkeleton from "@/components/Elements/NewUpdates/NewUpdatesSkeleton";

export const experimental_ppr = true;
const NewUpdatesPage = ({ params }: { params: Promise<{ page: number }> }) => {
  return (
    <div className="flex items-center">
      <GradBanner main="New Updates" sub="Recent Updated Chapters">
        <Suspense fallback={<NewUpdatesSkeleton />}>
          <NewUpdatesList params={params} />
        </Suspense>
      </GradBanner>
    </div>
  );
};

export default NewUpdatesPage;
