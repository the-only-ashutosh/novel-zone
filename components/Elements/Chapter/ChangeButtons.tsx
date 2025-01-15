import React from "react";
import { Button, ButtonProps } from "@nextui-org/react";

const ChangeButtons = (props: ButtonProps) => {
  return (
    <Button
      className="text-small rounded-sm mx-2 font-medium px-2 gap-0"
      color="primary"
      as={"a"}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default ChangeButtons;
