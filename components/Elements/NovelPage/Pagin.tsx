import React, { SVGProps } from "react";
import {
  cn,
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
  Spinner,
  Button,
} from "@heroui/react";

type IconSvgProps = SVGProps<SVGSVGElement>;

export const ChevronIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default function Pagin({
  pageSpinner,
}: Readonly<{ pageSpinner: number }>) {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <Button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onPress={onNext}
        >
          <ChevronIcon className="rotate-180" />
        </Button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <Button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onPress={onPrevious}
        >
          <ChevronIcon />
        </Button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <Button key={key} className={className}>
          ...
        </Button>
      );
    }

    // cursor is the default item
    return (
      <Button
        key={key}
        ref={ref}
        className={cn(className, isActive && "text-white bg-primary")}
        onPress={() => setPage(value)}
      >
        {pageSpinner === value ? <Spinner size="sm" color="white" /> : value}
      </Button>
    );
  };

  return (
    <Pagination
      showControls
      isCompact
      color="primary"
      className="gap-2"
      initialPage={1}
      radius="full"
      renderItem={renderItem}
      total={10}
    />
  );
}
