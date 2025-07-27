import React from "react";

export const Logo = () => {
  return (
    <svg
      fill="none"
      height="36"
      viewBox="0 0 32 32"
      width="36"
      // className="bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]"
    >
      <g fill="none">
        <defs>
          <linearGradient id="mainLogo">
            <stop stopColor="#5EA2EF"></stop>
            <stop offset={1} stopColor="#0072F5"></stop>
          </linearGradient>
        </defs>
        <path
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill="url(#mainLogo)"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

export default Logo;
