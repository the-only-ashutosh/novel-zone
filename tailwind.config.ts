import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */

const Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: { min: "320px", max: "523px" },
        md: { min: "524px", max: "687px" },
        lg: { min: "688px", max: "1019px" },
        xl: { min: "1020px" },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default Config;
