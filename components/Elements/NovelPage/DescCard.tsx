import React from "react";
import { correctString } from "@/service/functions";
import { Card, CardBody } from "@heroui/react";

const DescCard = ({ description }: { description: string }) => {
  return (
    <Card>
      <CardBody className="p-2">
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
