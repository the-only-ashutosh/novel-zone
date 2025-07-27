import { Card, CardBody, Chip } from "@heroui/react";
import { headers } from "next/headers";
import { ProgressBarLink } from "@/components/Shared/Progressbar/progress-bar";

export default async function NotFound() {
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
            <Chip className="rounded-md px-0" color="primary" variant="flat">
              {pathname}
            </Chip>{" "}
            could not be found. Check that you typed the URL correctly.
          </div>
          <div className="text-xl font-bold mb-3">
            You could possibly looking for:
          </div>
          <ul className="px-6 mb-3 list-disc">
            <li className="my-1">
              <ProgressBarLink href="/filter/allnovels">
                <Chip
                  className="rounded-md px-0"
                  color="primary"
                  variant="flat"
                >
                  All Novels
                </Chip>
              </ProgressBarLink>
            </li>
            <li className="my-1">
              <ProgressBarLink href="/filter/completed">
                <Chip
                  className="rounded-md px-0"
                  color="primary"
                  variant="flat"
                >
                  Completed
                </Chip>
              </ProgressBarLink>
            </li>
            <li className="my-1">
              <ProgressBarLink href="/filter/hotnovels">
                <Chip
                  className="rounded-md px-0"
                  color="primary"
                  variant="flat"
                >
                  Hot Novels
                </Chip>
              </ProgressBarLink>
            </li>
            <li className="my-1">
              <ProgressBarLink href="/filter/mostpopular">
                <Chip
                  className="rounded-md px-0"
                  color="primary"
                  variant="flat"
                >
                  Most Popular
                </Chip>
              </ProgressBarLink>
            </li>
            <li className="my-1">
              <ProgressBarLink href="/filter/newupdates">
                <Chip
                  className="rounded-md px-0"
                  color="primary"
                  variant="flat"
                >
                  New Updates
                </Chip>
              </ProgressBarLink>
            </li>
          </ul>
          <div className="text-medium font-semibold mb-3">
            Or, Please visit home :&nbsp;
            <ProgressBarLink href={"/"}>
              <Chip className="rounded-md px-0" color="primary" variant="flat">
                Home
              </Chip>
            </ProgressBarLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
