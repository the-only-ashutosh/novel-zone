import Link from "next/link";
import { Card, CardBody, Chip } from "@heroui/react";
import { fetchRandomBooks } from "@/service/dataoperation";
import { headers } from "next/headers";

export default async function NotFound() {
  const data = await fetchRandomBooks();
  const headersList = await headers();

  const pathname = headersList.get("pathname");
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="rounded-sm xl:w-[40vw] lg:w-[50vw] md:w-[65vw] sm:w-[90vw]">
        <CardBody className="flex flex-col p-6">
          <div className="text-2xl font-bold flex items-center justify-center mb-3">
            Page Not Found
          </div>
          <div className="text-medium font-medium mb-3">
            The requested page{" "}
            <Chip
              className="rounded-md px-0 line-clamp-1 max-w-full min-w-0"
              color="primary"
              variant="flat"
            >
              {decodeURI(pathname)}
            </Chip>{" "}
            could not be found. Check that you typed the URL correctly.
          </div>
          <div className="text-xl font-bold mb-3">
            You could possibly looking for:
          </div>
          <ul className="px-6 mb-3 list-disc">
            {data.map((book) => {
              return (
                <li className="my-1" key={book.id}>
                  <Link href={`/book/${book.bookUrl}`}>
                    <Chip
                      className="rounded-md px-0"
                      color="primary"
                      variant="flat"
                    >
                      {book.title}
                    </Chip>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="text-medium font-semibold mb-3">
            Or, Please visit page :&nbsp;
            <Link href={"/"}>
              <Chip className="rounded-md px-0" color="primary" variant="flat">
                Home
              </Chip>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
