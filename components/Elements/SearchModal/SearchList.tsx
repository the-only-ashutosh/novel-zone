import React, { useEffect } from "react";
import { ScrollShadow } from "@heroui/react";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import axios from "axios";

import Searchlistitem from "./SearchListitem";

const SearchList = ({
  toSearch,
  closeModal,
}: {
  toSearch: string | null;
  closeModal: () => void;
}) => {
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
    if (toSearch!.length === 0) {
      setData(null);
      setError(false);
    } else if (toSearch!.length > 2) {
      setError(false);
      setData(null);
      axios
        .get(`/api/search?toSearch=${toSearch}`)
        .then((res) => {
          setData(res.data);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [toSearch]);

  return (
    <div className="bg-none rounded-none absolute flex-grow overflow-y-auto w-full m-0 p-0 top-[56px]">
      {error && (
        <Collapse>
          <Searchlistitem state={"Error Occured"} data={null} clMd={() => {}} />
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
                />
              </Collapse>
            )}
          </TransitionGroup>
        </ScrollShadow>
      )}
      {data === null && toSearch!.length > 2 && (
        <TransitionGroup>
          <Collapse>
            <Searchlistitem state={"Loading"} data={null} clMd={() => {}} />
          </Collapse>
        </TransitionGroup>
      )}
    </div>
  );
};

export default SearchList;
