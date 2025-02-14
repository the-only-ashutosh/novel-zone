import React, { Suspense } from "react";
import "./style.css";
import ProfileServer from "@/components/Elements/User/ProfileServer";
import Loading from "./loading";

export const experimental_ppr = true;

export default function ProfilePage() {
  return (
    <div className="flex flex-col w-full h-full">
      <Suspense fallback={<Loading />}>
        <ProfileServer />
      </Suspense>
    </div>
  );
}
