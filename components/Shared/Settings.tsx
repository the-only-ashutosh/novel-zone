import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { FiSettings } from "react-icons/fi";
import { Popover, PopoverTrigger } from "@heroui/react";
import dynamic from "next/dynamic";
const PopoverCont = dynamic(() => import("./PopoverCont"), { ssr: true });

const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      backdrop={"transparent"}
      offset={10}
      placement="bottom"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      showArrow
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "px-2.5 py-1 border-small border-divider bg-background",
      }}
    >
      <PopoverTrigger>
        <IconButton
          aria-controls="settings-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          color="primary"
          aria-label="settings-button"
          aria-labelledby="settings-menu"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <FiSettings size={24} />
        </IconButton>
      </PopoverTrigger>
      <PopoverCont />
    </Popover>
  );
};

export default SettingsMenu;
