"use server";
import { getXataClient } from "@/xata";
import { User } from "next-auth";
import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";
const xata = getXataClient();

export async function checkSession() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin", RedirectType.replace);
  } else {
    return await xata.db.users
      .filter({ userId: session.user!.id! })
      .select(["*"])
      .getAll()
      .then((data) => data.toArray()[0]);
  }
}

export async function getRecords() {
  const records = await xata.db.history
    .filter({ "userId.userName": "the-only-ashutosh" })
    .select(["*"])
    .getAll();
  console.log(records);
}

export async function upsertUser(u: User) {
  const user = await xata.db.users
    .filter({ userId: u.id })
    .select(["userName", "firstName", "lastName"])
    .getAll();
  if (user.toArray().length === 0) {
    const [firstName, lastName] = u.name!.split(" ");
    await xata.db.users.create({
      firstName,
      lastName,
      avatar: u.image!,
      email: u.email,
      userId: u.id,
      bio: "",
      userName: "",
    });
  }
}

export async function updateUser(formData: FormData) {
  const age = String(formData.get("age"))
    .split("-")
    .map((s) => Number(s));
  await xata.db.users.update(String(formData.get("id")), {
    bio: String(formData.get("bio")),
    firstName: String(formData.get("firstName")),
    lastName: String(formData.get("lastName")),
    userName: String(formData.get("userName")),
    gender: String(formData.get("gender")),
    age: new Date(age[0], age[1] - 1, age[2]),
  });
  redirect("/user/profile", RedirectType.replace);
}

export async function checkUserName(userName: string) {
  return await xata.db.users
    .filter({ userName })
    .select(["xata_id"])
    .getFirst();
}
