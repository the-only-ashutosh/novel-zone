"use client";
import React, { useState } from "react";
import {
  CalendarIcon,
  EditDocumentIcon,
  // LetsIconsCheckFill,
  MailIcon,
  // OuiCrossInCircleFilled,
  SolarEyeBold,
  SolarEyeClosedLinear,
} from "@/components/Elements/User/Icons";
import {
  // CalendarDate,
  parseDate,
} from "@internationalized/date";
import {
  Input,
  Textarea,
  Button,
  RadioGroup,
  Radio,
  Tooltip,
  Spinner,
  DateInput,
  // Spinner,
} from "@heroui/react";
import { Profile } from "@/types";
import Form from "next/form";
import {
  // checkUserName,
  updateUser,
} from "@/service/useraction";
import { setGender } from "./ProfileServer";

function newMail([mail, domain]: string[]) {
  const frontPart = mail.substring(0, 2);
  const backPart = mail.substring(mail.length - 2);
  let middlePart = "";
  for (let i = 0; i < mail.length - 4; i++) {
    middlePart += "*";
  }
  return `${frontPart}${middlePart}${backPart}@${domain}`;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month > 9 ? month : "0" + month}-${
    day > 9 ? day : "0" + day
  }`;
}

const ProfileComp = ({ profile }: { profile: Profile }) => {
  const [userData, setUserData] = useState<Profile>(profile);
  const [editMode, setEditMode] = useState(true);
  const [ageError, setAgeError] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  // const [unExists, setUnExists] = useState("0");
  const hiddenMail = newMail(profile.email.split("@"));
  return (
    <>
      <div className="flex justify-between flex-row w-full items-center px-8 mt-6">
        <h1 className="text-xl font-semibold">Details</h1>
        <Tooltip
          showArrow
          classNames={{
            base: ["before:bg-neutral-400 dark:before:bg-white"],
            content: [
              "py-2 px-4 shadow-xl",
              "text-black bg-gradient-to-br from-white to-neutral-400",
            ],
          }}
          content="Edit"
          placement="bottom"
        >
          <EditDocumentIcon
            width={24}
            height={24}
            className={
              editMode
                ? "text-primary"
                : ageError
                ? "text-danger"
                : "text-success"
            }
            onClick={() => setEditMode((prev) => !prev)}
          />
        </Tooltip>
      </div>
      <Form
        action={async (fD) => {
          if (!ageError && !editMode) {
            fD.append("id", userData.id);
            await updateUser(fD);
          }
        }}
        className="w-full py-6 px-8"
      >
        <div className="flex w-full mb-2">
          <Input
            variant="bordered"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-primary">@</span>
              </div>
            }
            type="text"
            label="Username"
            name="userName"
            value={userData.userName}
            classNames={{
              base: "rounded-sm",
              inputWrapper: "rounded-sm",
            }}
            // endContent={
            //   unExists !== "0" ? (
            //     unExists === "1" ? (
            //       <LetsIconsCheckFill className="text-success text-2xl" />
            //     ) : (
            //       <OuiCrossInCircleFilled className="text-danger text-2xl" />
            //     )
            //   ) : (
            //     <></>
            //   )
            // }
            // errorMessage={
            //   ageError
            //     ? "Please enter a valid username"
            //     : unExists && "User already exists"
            // }
            // onValueChange={async (v) => {
            //   if (v.match(/^(?=.{7,12}$)[a-zA-Z]+\d+$/g)) {
            //     if (await checkUserName(v)) {
            //       setUnExists("1");
            //     } else {
            //       setUserData({ ...userData, userName: v });
            //       setAgeError(false);
            //       setUnExists("0");
            //     }
            //   } else {
            //     setAgeError(true);
            //   }
            // }}
            className="w-full"
            // isReadOnly={editMode}
            readOnly
          />
        </div>
        <div className="flex w-full mb-2 gap-4 flex-col xl:flex-row inputs-container">
          <Input
            label="First Name"
            type="text"
            variant="bordered"
            name="firstName"
            className="xl:w-1/2 w-full rounded-sm inputs"
            value={userData.firstName}
            classNames={{
              base: "rounded-sm",
              inputWrapper: "rounded-sm",
            }}
            isReadOnly={editMode}
            onValueChange={(v) => setUserData({ ...userData, firstName: v })}
          />
          <Input
            label="Last Name"
            type="text"
            variant="bordered"
            name="lastName"
            value={userData.lastName}
            className="xl:w-1/2 w-full rounded-sm inputs"
            classNames={{
              base: "rounded-sm",
              inputWrapper: "rounded-sm",
            }}
            isReadOnly={editMode}
            onValueChange={(v) => setUserData({ ...userData, lastName: v })}
          />
        </div>
        <div className="flex w-full mb-2 gap-4 flex-col xl:flex-row inputs-container">
          <Input
            label="Email"
            value={!isVisible ? profile.email : hiddenMail}
            type="email"
            variant="bordered"
            className="xl:w-1/2 w-full rounded-sm inputs"
            classNames={{
              base: "rounded-sm",
              inputWrapper: "rounded-sm",
            }}
            readOnly
            startContent={
              <MailIcon className="text-xl text-primary pointer-events-none flex-shrink-0" />
            }
            endContent={
              <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
              >
                {isVisible ? (
                  <SolarEyeClosedLinear
                    className="pointer-events-none text-primary"
                    width={24}
                    height={24}
                  />
                ) : (
                  <SolarEyeBold
                    className="pointer-events-none text-primary"
                    width={24}
                    height={24}
                  />
                )}
              </button>
            }
          />
          <DateInput
            label="Date of Birth"
            variant="bordered"
            name="age"
            defaultValue={
              userData.age
                ? parseDate(formatDate(userData.age))
                : parseDate(formatDate(new Date()))
            }
            value={
              userData.age
                ? parseDate(formatDate(userData.age))
                : parseDate(formatDate(new Date()))
            }
            className="xl:w-1/2 w-full rounded-sm inputs"
            classNames={{
              base: "rounded-sm",
              inputWrapper: "rounded-sm",
            }}
            isReadOnly={editMode}
            onChange={(v) => {
              if (v!.year > 1969) {
                setUserData({
                  ...userData,
                  age: new Date(v!.year, v!.month - 1, v!.day),
                });
              }
            }}
            // placeholderValue={new CalendarDate(1995, 11, 6)}
            endContent={
              <CalendarIcon className="text-2xl text-primary pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <div className="flex w-full mb-2">
          <RadioGroup
            label="Select your gender"
            orientation="horizontal"
            value={userData.gender}
            isReadOnly={editMode}
            name="gender"
            onValueChange={(v) =>
              setUserData({ ...userData, gender: setGender(v) })
            }
          >
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
            <Radio value="O">Others</Radio>
          </RadioGroup>
        </div>
        <div className="flex w-full mb-2">
          <Textarea
            variant="bordered"
            label="Bio"
            className="w-full"
            name="bio"
            value={userData.bio}
            classNames={{
              base: "rounded-sm",
              inputWrapper: "rounded-sm",
            }}
            maxRows={3}
            minRows={3}
            disableAutosize
            isReadOnly={editMode}
            onValueChange={(v) => setUserData({ ...userData, bio: v })}
          />
        </div>
        <div className="w-full mb-2 flex justify-end items-center">
          <Button
            color="danger"
            radius="sm"
            className="mr-4"
            onPress={() => {
              setUserData(profile);
            }}
            isDisabled={editMode}
          >
            Discard
          </Button>
          <Button
            color="primary"
            radius="sm"
            type="submit"
            onPress={() => setFormSubmit(true)}
            isDisabled={editMode}
          >
            {formSubmit ? <Spinner size="sm" color="white" /> : "Save"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProfileComp;
