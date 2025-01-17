"use client";
import { useEffect, useState } from "react";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import cx from "classnames";
import FontMenu from "./FontMenu";
import FontSizeMenu from "./FontSizeMenu";
import { ThemeSwitch } from "./theme-switch";
import { PopoverContent } from "@heroui/react";
import styled, { keyframes } from "styled-components";
import { deleteCookie } from "cookies-next/client";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RefreshButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border-radius: 100%;
  border: 0;
  .refresh--icon.refresh--icon__is-refreshing {
    animation: ${rotate} 1s infinite;
    animation-timing-function: cubic-bezier(0.42, 0.2, 0.58, 1);
  }
`;

const PopoverCont = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let refreshTimer: NodeJS.Timeout;
    let successTimer: NodeJS.Timeout;
    if (isRefreshing) {
      refreshTimer = setTimeout(() => {
        setIsRefreshing(false);
        setShowSuccess(true);
      }, 3000);
    }
    if (showSuccess) {
      successTimer = setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    }
    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(successTimer);
    };
  }, [isRefreshing, showSuccess]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    deleteCookie("fontStyle");
    deleteCookie("fontSize");
    localStorage.removeItem("theme");
  };

  return (
    <PopoverContent className="rounded-md flex flex-col justify-center items-center w-[208px]">
      <div className="flex flex-row justify-between items-center w-full mt-2">
        <span>Theme</span>
        <ThemeSwitch />
      </div>
      <div className="flex flex-row justify-between mt-4 items-center w-full mb-2">
        <span>Clear Cache</span>
        <RefreshButton onClick={handleRefresh}>
          <RefreshRoundedIcon
            className={
              cx({
                "refresh--icon": true,
                "refresh--icon__is-refreshing": isRefreshing,
              }) + " text-[#006FEE]"
            }
          />
        </RefreshButton>
      </div>
      <div className="flex flex-row justify-between items-center w-full mt-2">
        <span>Font Style</span>
        <FontMenu />
      </div>
      <div className="flex flex-row justify-between mt-4 items-center mb-2 w-full">
        <span>Font Size</span>
        <FontSizeMenu />
      </div>
    </PopoverContent>
  );
};

export default PopoverCont;
