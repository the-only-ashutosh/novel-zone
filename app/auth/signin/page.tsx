import * as React from "react";
import { cookies } from "next/headers";
import SigninForm from "@/components/Elements/Authentication/SigninForm";
import { getCookie } from "cookies-next/server";

export default async function SignInPage() {
  const callbackUrl = await getCookie("callbackUrl", { cookies });
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SigninForm callback={callbackUrl ?? "/"} />
    </div>
  );
}
