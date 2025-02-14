import AvatarFallback from "./AvatarFallback";
import { NavbarItem } from "@heroui/react";
import AvatarMenu from "./AvatarMenu";
// import { signOut } from "@/auth";

export default function MyAvatar({
  session,
}: Readonly<{
  session: { name: string; image: string; email: string } | null;
}>) {
  return (
    <NavbarItem>
      {session ? (
        <AvatarMenu
          image={session.image}
          name={session.name}
          email={session.email}
          // signout={async () => {
          //   "use server";
          //   await signOut({ redirect: true, redirectTo: pathname });
          // }}
        />
      ) : (
        <AvatarFallback />
      )}
    </NavbarItem>
  );
}
