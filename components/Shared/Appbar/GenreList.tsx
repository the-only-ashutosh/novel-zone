import React from "react";
import { DropdownItem, DropdownMenu } from "@heroui/react";
import { ALL_GENRE } from "@/service/genre";
import { usePathname, useRouter } from "next/navigation";

const GenreList = ({
  menuclose,
}: {
  menuclose: null | ((state: boolean) => void);
}) => {
  const router = useRouter();
  const pathname = usePathname().split("/");
  let route = "";
  if (pathname.length > 3) {
    route = pathname[3];
  }
  return (
    <DropdownMenu
      aria-label="Genre"
      selectedKeys={new Set([route])}
      selectionMode="single"
      classNames={{
        base: "max-w-full",
        list: "grid grid-cols-3",
      }}
      itemClasses={{
        base: [
          "gap-4",
          "rounded-md",
          "text-default-500",
          "transition-opacity",
          "data-[hover=true]:text-foreground",
          "data-[hover=true]:bg-default-100",
          "dark:data-[hover=true]:bg-default-50",
          "data-[selectable=true]:focus:bg-default-50",
          "data-[pressed=true]:opacity-70",
          "data-[focus-visible=true]:ring-default-500",
        ],
      }}
    >
      {...ALL_GENRE.map((e) => {
        return (
          <DropdownItem
            key={e.route}
            className="text-sm data-[selected=true]:bg-primary data-[selected=true]:text-white data-[hover=true]:bg-primary data-[hover=true]:text-white data-[focus=true]:bg-primary data-[focus=true]:text-white dark:data-[selected=true]:bg-primary dark:data-[selected=true]:text-white dark:data-[hover=true]:bg-primary dark:data-[hover=true]:text-white dark:data-[focus=true]:bg-primary dark:data-[focus=true]:text-white"
            value={e.name}
            onPress={() => {
              router.push(`/filter/genre/${e.route}`);
              if (menuclose !== null) menuclose(false);
            }}
            textValue={`${e.name} Genre`}
          >
            {e.name}
          </DropdownItem>
        );
      })}
    </DropdownMenu>
  );
};

export default GenreList;
