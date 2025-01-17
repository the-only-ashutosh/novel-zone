"use client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeroUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
