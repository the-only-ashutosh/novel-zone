import { checkSession } from "@/service/useraction";
import { Profile } from "@/types";
import React from "react";
import ProfileComp from "./Profile";

export function setGender(g: string) {
  if (g === "M") return "M";
  else if (g === "F") return "F";
  else if (g === "O") return "O";
  else return null;
}

const ProfileServer = async () => {
  const session = await checkSession();
  const dummy: Profile = {
    firstName: session.firstName!,
    lastName: session.lastName!,
    userName: session.userName!,
    age: session!.age,
    email: session.email!,
    gender: setGender(session.gender!),
    bio: session.bio!,
    userId: session.userId!,
    id: session.xata_id,
  };
  return (
    <div className="flex flex-col justify-center items-center mx-4">
      <ProfileComp profile={dummy} />
    </div>
  );
};

export default ProfileServer;
