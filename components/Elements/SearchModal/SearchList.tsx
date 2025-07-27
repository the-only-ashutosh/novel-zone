import React, { useEffect } from "react";
import { ScrollShadow } from "@heroui/react";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import Searchlistitem from "./SearchListitem";

const SearchList = ({
  toSearch,
  closeModal,
  viewport,
}: {
  toSearch: string | null;
  closeModal: () => void;
  viewport: string;
}) => {
  const [debounced, setDebounced] = React.useState<string | null>("");
  const [data, setData] = React.useState<
    | Array<{
        id: number;
        title: string;
        bookUrl: string;
        _count: { chapter: number };
      }>
    | "No Books"
    | null
  >(null);
  const [error, setError] = React.useState<boolean>(false);
  useEffect(() => {
    async function d(s: string) {
      const axios = (await import("axios")).default;
      await axios
        .post(`/api/data/search`, { search: s })
        .then((res) => {
          setData(res.data);
        })
        .catch(() => {
          setError(true);
        });
    }
    if (debounced!.length === 0) {
      setData(null);
      setError(false);
    } else if (debounced!.length > 2) {
      setError(false);
      setData(null);
      d(debounced!);
    }
  }, [debounced]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(toSearch);
    }, 1500);

    return () => clearTimeout(handler);
  }, [toSearch]);
  return (
    <div className="bg-none rounded-none absolute grow overflow-y-auto w-full m-0 p-0 top-[56px]">
      {error && (
        <Collapse>
          <Searchlistitem
            state={"Error Occured"}
            data={null}
            clMd={() => {}}
            viewport={viewport}
          />
        </Collapse>
      )}
      {data && (
        <ScrollShadow className="h-[264px]" size={0}>
          <TransitionGroup>
            {data !== "No Books" ? (
              data.map((book) => {
                return (
                  <Collapse key={book.id}>
                    <Searchlistitem
                      data={{
                        bookUrl: book.bookUrl,
                        chapters: book._count.chapter,
                        title: book.title,
                      }}
                      state={null}
                      clMd={closeModal}
                      viewport={viewport}
                    />
                  </Collapse>
                );
              })
            ) : (
              <Collapse>
                <Searchlistitem
                  state={"No Books"}
                  data={null}
                  clMd={() => {}}
                  viewport={viewport}
                />
              </Collapse>
            )}
          </TransitionGroup>
        </ScrollShadow>
      )}
      {data === null && toSearch!.length > 2 && (
        <TransitionGroup>
          <Collapse>
            <Searchlistitem
              state={"Loading"}
              data={null}
              clMd={() => {}}
              viewport={viewport}
            />
          </Collapse>
        </TransitionGroup>
      )}
    </div>
  );
};

export default SearchList;
