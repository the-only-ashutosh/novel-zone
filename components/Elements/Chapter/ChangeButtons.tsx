import React from "react";
import { Button, ButtonProps } from "@heroui/react";

const ChangeButtons = (props: ButtonProps) => {
  return (
    <Button
      className="text-small rounded-sm mx-2 font-medium px-2 gap-0"
      color="primary"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default ChangeButtons;
