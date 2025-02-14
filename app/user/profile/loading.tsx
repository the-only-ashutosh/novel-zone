import { EditDocumentIcon } from "@/components/Elements/User/Icons";
import { Skeleton, Tooltip } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center mx-4">
      <div className="flex justify-between flex-row w-full items-center px-8 mt-6">
        <h1 className="text-xl font-semibold">Details</h1>
        <Tooltip
          showArrow
          classNames={{
            base: ["before:bg-neutral-400 dark:before:bg-white"],
            content: [
              "py-2 px-4 shadow-xl",
              "text-black bg-gradient-to-br from-white to-neutral-400",
            ],
          }}
          content="Edit"
          placement="bottom"
        >
          <EditDocumentIcon width={24} height={24} className={"text-primary"} />
        </Tooltip>
      </div>
      <div className="w-full py-6 px-8">
        <Skeleton className="flex w-full mb-2 rounded-sm">
          <div className="w-full h-14 rounded-sm" />
        </Skeleton>
        <div className="flex w-full mb-2 gap-4 flex-col xl:flex-row inputs-container">
          <Skeleton className="xl:w-1/2 w-full rounded-sm inputs">
            <div className="xl:w-1/2 w-full rounded-sm inputs h-14" />
          </Skeleton>
          <Skeleton className="xl:w-1/2 w-full rounded-sm inputs">
            <div className="xl:w-1/2 w-full rounded-sm inputs h-14" />
          </Skeleton>
        </div>
        <div className="flex w-full mb-2 gap-4 flex-col xl:flex-row inputs-container">
          <Skeleton className="xl:w-1/2 w-full rounded-sm inputs">
            <div className="xl:w-1/2 w-full rounded-sm inputs h-14" />
          </Skeleton>
          <Skeleton className="xl:w-1/2 w-full rounded-sm inputs">
            <div className="xl:w-1/2 w-full rounded-sm inputs h-14" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
