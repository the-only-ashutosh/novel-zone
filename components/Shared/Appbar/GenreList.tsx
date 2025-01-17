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
        base: "gap-4",
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
          >
            {e.name}
          </DropdownItem>
        );
      })}
    </DropdownMenu>
  );
};

export default GenreList;
