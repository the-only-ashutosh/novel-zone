import React from "react";
import { DropdownItem, DropdownMenu } from "@heroui/react";
import { ALL_GENRE } from "@/service/genre";
import { useRouter } from "next/navigation";

const GenreList = ({
  menuclose,
}: {
  menuclose: null | ((state: boolean) => void);
}) => {
  const router = useRouter();
  return (
    <DropdownMenu
      aria-label="ACME features"
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
            className="text-sm"
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
