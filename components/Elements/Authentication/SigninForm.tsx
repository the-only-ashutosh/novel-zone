"use client";

import React from "react";
import { Button, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  FlatColorIconsGoogle,
  LaGithub,
  LogosRedditIcon,
  MingcuteBackLine,
  SkillIconsDiscord,
} from "./Icons";

export default function SigninForm({
  callback,
}: Readonly<{ callback: string }>) {
  const [googleSp, setGoogleSp] = React.useState(false);
  const [githubSp, setGithubSp] = React.useState(false);
  const [discordSp, setDiscordSp] = React.useState(false);
  const [redditSp, setRedditSp] = React.useState(false);
  const router = useRouter();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-md bg-content1 px-8 pb-10 pt-6 shadow-large">
        <div className="flex flex-row items-center">
          <Button
            isIconOnly
            variant="light"
            disableRipple
            className="data-[hover=true]:bg-none"
            startContent={
              <MingcuteBackLine width={24} className="text-primary" />
            }
            onPress={() => {
              router.back();
            }}
          />
          <div className="flex flex-col w-full justify-center items-center">
            <h1 className="font-bold text-large mr-[30px] bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]">
              NOVEL ZONE
            </h1>
            <h3 className="font-semibold text-md mr-8">Sign in to continue</h3>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<FlatColorIconsGoogle width={24} />}
            variant="bordered"
            onPress={() => {
              if (!githubSp && !discordSp && !redditSp) {
                setGoogleSp(true);
                signIn("google", { redirectTo: callback });
              }
            }}
            disableRipple
          >
            <div className="w-[138px] flex justify-center">
              {googleSp ? (
                <Spinner size="sm" color="primary" />
              ) : (
                "Continue with Google"
              )}
            </div>
          </Button>
          <Button
            startContent={<LaGithub width={24} />}
            variant="bordered"
            onPress={() => {
              if (!googleSp && !discordSp && !redditSp) {
                setGithubSp(true);
                signIn("github", { redirectTo: callback });
              }
            }}
            disableRipple
          >
            <div className="w-[138px] flex justify-center">
              {githubSp ? (
                <Spinner size="sm" color="primary" />
              ) : (
                "Continue with Github"
              )}
            </div>
          </Button>
          <Button
            startContent={<SkillIconsDiscord width={24} />}
            variant="bordered"
            onPress={() => {
              if (!googleSp && !githubSp && !redditSp) {
                setDiscordSp(true);
                signIn("discord", { redirectTo: callback });
              }
            }}
            disableRipple
          >
            <div className="w-[138px] flex justify-center">
              {discordSp ? (
                <Spinner size="sm" color="primary" />
              ) : (
                "Continue with Discord"
              )}
            </div>
          </Button>
          <Button
            startContent={<LogosRedditIcon width={24} />}
            variant="bordered"
            onPress={() => {
              if (!googleSp && !githubSp && !discordSp) {
                setRedditSp(true);
                signIn("reddit", { redirectTo: callback });
              }
            }}
            disableRipple
          >
            <div className="w-[138px] flex justify-center">
              {redditSp ? (
                <Spinner size="sm" color="primary" />
              ) : (
                "Continue with Reddit"
              )}
            </div>
          </Button>
        </div>
        {/* <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="#" size="sm">
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
}
