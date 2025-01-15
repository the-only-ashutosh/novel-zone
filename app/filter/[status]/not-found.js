import Link from "next/link";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = await headers();

  const pathname = headersList.get("pathname");
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <Card className="rounded-sm xl:w-[40vw] lg:w-[50vw] md:w-[65vw] sm:w-[90vw]">
        <CardBody className="flex flex-col p-6">
          <div className="text-2xl font-bold flex items-center justify-center mb-3">
            Page Not Found
          </div>
          <div className="text-medium font-medium mb-3">
            The requested page{" "}
            <Chip className="rounded-md px-0" color="primary" variant="flat">
              {pathname.replaceAll("%20", " ")}
            </Chip>{" "}
            could not be found. Check that you typed the URL correctly.
          </div>
          <div className="text-xl font-bold mb-3">
            You could possibly looking for:
          </div>
          <ul className="px-6 mb-3 list-disc">
            <li className="my-1">
              <Link href="/filter/status/Completed">
                <Chip
                  className="rounded-md px-0"
                  color="primary"
                  variant="flat"
                >
                  Completed
                </Chip>
              </Link>
            </li>
            <li className="my-1">
              <Link href="/filter/status/Dropped">
                <Chip
                  className="rounded-md px-0"
                  color="primary"
                  variant="flat"
                >
                  Dropped
                </Chip>
              </Link>
            </li>
            <li className="my-1">
              <Link href="/filter/status/Ongoing">
                <Chip
                  className="rounded-md px-0"
                  color="primary"
                  variant="flat"
                >
                  Ongoing
                </Chip>
              </Link>
            </li>
          </ul>
          <div className="text-medium font-semibold mb-3">
            Or, Please visit home :&nbsp;
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
