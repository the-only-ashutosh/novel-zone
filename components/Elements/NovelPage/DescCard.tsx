import React from "react";
import { correctString } from "@/service/functions";
import { Card, CardBody } from "@nextui-org/react";

const DescCard = ({ description }: { description: string }) => {
  return (
    <Card>
      <CardBody>
        {correctString(description)
          .split("[hereisbreak]")
          .map((sd, i) => {
            return <p key={`kdjs${i}`}>{sd}</p>;
          })}
      </CardBody>
    </Card>
  );
};

export default DescCard;
