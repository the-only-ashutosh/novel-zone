import React from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { FaList } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Chapter = {
  url: string;
  number: number;
  title: string;
};

const SelectList = ({
  book_name,
  current,
}: {
  book_name: string;
  current: number;
}) => {
  const [dataset, setDataset] = React.useState<Array<Chapter>>([]);
  const [value, setValue] = React.useState(new Set([""]));
  const router = useRouter();
  return (
    <div>
      {dataset.length === 0 ? (
        <Button
          isIconOnly
          disableRipple
          radius="sm"
          color="primary"
          className="rounded-sm"
          onPress={async () => {
            const axios = (await import("axios")).default;
            await axios
              .post("/api/getChaptersList", { book: book_name })
              .then(
                ({
                  data,
                }: {
                  data: { message: string; content: Array<Chapter> };
                }) => {
                  if (data.message === "Success") {
                    setValue(
                      new Set([
                        String(
                          data.content.filter((x) => x.number === current)[0]
                            .title
                        ),
                      ])
                    );
                    setDataset(data.content);
                  }
                }
              );
          }}
        >
          <FaList />
        </Button>
      ) : (
        <Select
          isVirtualized
          selectedKeys={value}
          color="primary"
          defaultSelectedKeys={value}
          radius="sm"
          classNames={{
            mainWrapper: "w-[173px] rounded-sm",
            popoverContent: "rounded-sm",
            trigger:
              "bg-primary text-white data-[hover=true]:bg-primary rounded-sm",
            value: "text-white",
          }}
          onSelectionChange={(keys) => {
            setValue(new Set([String(keys.currentKey)]));
          }}
        >
          {dataset.map((item) => (
            <SelectItem
              key={item.title}
              value={item.url}
              variant="solid"
              color="primary"
              className="rounded-sm"
              onPress={() => {
                router.push(`/book/${book_name}/${item.url}`);
              }}
            >
              {item.title}
            </SelectItem>
          ))}
        </Select>
      )}
    </div>
  );
};

export default SelectList;
