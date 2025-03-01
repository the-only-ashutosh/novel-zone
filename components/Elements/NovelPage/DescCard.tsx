import React from "react";
import { correctString } from "@/service/functions";
import { Card, CardBody } from "@heroui/react";

const DescCard = ({ description }: { description: string }) => {
  return (
    <Card className="opacity-90 shadow-md dark:bg-black dark:opacity-80 dark:shadow-white dark:shadow-sm">
      <CardBody className="p-2 bg-transparent">
        {correctString(description)
          .split("[hereisbreak]")
          .map((sd, i) => {
            return (
              <p key={`kdjs${i}${sd.substring(0, 10)}`} className="mb-2">
                {sd}
              </p>
            );
          })}
      </CardBody>
    </Card>
  );
};

export default DescCard;
