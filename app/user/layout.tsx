import AvatarComp from "@/components/Elements/User/AvatarComp";
import ButtonGrp from "@/components/Elements/User/ButtonGrp";
import { checkSession } from "@/service/useraction";
import { Card, CardBody } from "@heroui/react";
import { Typography } from "@mui/material";
import React, { ReactElement } from "react";

export default function UserLayout({
  children,
}: Readonly<{ children: ReactElement }>) {
  const user = React.use(checkSession());
  return (
    <Card className="rounded-small bg-transparent p-0 border-small m-4 border-default-200 dark:border-white">
      <CardBody className="flex flex-row rounded-small bg-transparent p-0">
        <div className="flex flex-col min-w-min border-r-small rounded-l-small border-default-200 dark:border-white">
          <div className="flex flex-col justify-center items-center p-6 w-56">
            <AvatarComp image={user.avatar!} name={user.firstName!} />
            <Typography variant="h4" fontSize={16}>
              {user.firstName!}
            </Typography>
          </div>
          <ButtonGrp />
        </div>
        {children}
      </CardBody>
    </Card>
  );
}
