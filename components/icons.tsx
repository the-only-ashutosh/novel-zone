import * as React from "react";

import { IconSvgProps } from "@/types";
import { SVGProps } from "react";
import "./s.css";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
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
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const NextUILogo: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;

  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 161 32"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-black dark:fill-white"
        d="M55.6827 5V26.6275H53.7794L41.1235 8.51665H40.9563V26.6275H39V5H40.89L53.5911 23.1323H53.7555V5H55.6827ZM67.4831 26.9663C66.1109 27.0019 64.7581 26.6329 63.5903 25.9044C62.4852 25.185 61.6054 24.1633 61.0537 22.9582C60.4354 21.5961 60.1298 20.1106 60.1598 18.6126C60.132 17.1113 60.4375 15.6228 61.0537 14.2563C61.5954 13.0511 62.4525 12.0179 63.5326 11.268C64.6166 10.5379 65.8958 10.16 67.1986 10.1852C68.0611 10.1837 68.9162 10.3468 69.7187 10.666C70.5398 10.9946 71.2829 11.4948 71.8992 12.1337C72.5764 12.8435 73.0985 13.6889 73.4318 14.6152C73.8311 15.7483 74.0226 16.9455 73.9968 18.1479V19.0773H63.2262V17.4194H72.0935C72.1083 16.4456 71.8952 15.4821 71.4714 14.6072C71.083 13.803 70.4874 13.1191 69.7472 12.6272C68.9887 12.1348 68.1022 11.8812 67.2006 11.8987C66.2411 11.8807 65.3005 12.1689 64.5128 12.7223C63.7332 13.2783 63.1083 14.0275 62.6984 14.8978C62.2582 15.8199 62.0314 16.831 62.0352 17.8546V18.8476C62.009 20.0078 62.2354 21.1595 62.6984 22.2217C63.1005 23.1349 63.7564 23.9108 64.5864 24.4554C65.4554 24.9973 66.4621 25.2717 67.4831 25.2448C68.1676 25.2588 68.848 25.1368 69.4859 24.8859C70.0301 24.6666 70.5242 24.3376 70.9382 23.919C71.3183 23.5345 71.6217 23.0799 71.8322 22.5799L73.5995 23.1604C73.3388 23.8697 72.9304 24.5143 72.4019 25.0506C71.8132 25.6529 71.1086 26.1269 70.3314 26.4434C69.4258 26.8068 68.4575 26.9846 67.4831 26.9663V26.9663ZM78.8233 10.4075L82.9655 17.325L87.1076 10.4075H89.2683L84.1008 18.5175L89.2683 26.6275H87.103L82.9608 19.9317L78.8193 26.6275H76.6647L81.7711 18.5169L76.6647 10.4062L78.8233 10.4075ZM99.5142 10.4075V12.0447H91.8413V10.4075H99.5142ZM94.2427 6.52397H96.1148V22.3931C96.086 22.9446 96.2051 23.4938 96.4597 23.9827C96.6652 24.344 96.9805 24.629 97.3589 24.7955C97.7328 24.9548 98.1349 25.0357 98.5407 25.0332C98.7508 25.0359 98.9607 25.02 99.168 24.9857C99.3422 24.954 99.4956 24.9205 99.6283 24.8853L100.026 26.5853C99.8062 26.6672 99.5805 26.7327 99.3511 26.7815C99.0274 26.847 98.6977 26.8771 98.3676 26.8712C97.6854 26.871 97.0119 26.7156 96.3973 26.4166C95.7683 26.1156 95.2317 25.6485 94.8442 25.0647C94.4214 24.4018 94.2097 23.6242 94.2374 22.8363L94.2427 6.52397ZM118.398 5H120.354V19.3204C120.376 20.7052 120.022 22.0697 119.328 23.2649C118.644 24.4235 117.658 25.3698 116.477 26.0001C115.168 26.6879 113.708 27.0311 112.232 26.9978C110.759 27.029 109.302 26.6835 107.996 25.9934C106.815 25.362 105.827 24.4161 105.141 23.2582C104.447 22.0651 104.092 20.7022 104.115 19.319V5H106.08V19.1831C106.061 20.2559 106.324 21.3147 106.843 22.2511C107.349 23.1459 108.094 23.8795 108.992 24.3683C109.993 24.9011 111.111 25.1664 112.242 25.139C113.373 25.1656 114.493 24.9003 115.495 24.3683C116.395 23.8815 117.14 23.1475 117.644 22.2511C118.16 21.3136 118.421 20.2553 118.402 19.1831L118.398 5ZM128 5V26.6275H126.041V5H128Z"
      />
      <path
        className="fill-black dark:fill-white"
        d="M23.5294 0H8.47059C3.79241 0 0 3.79241 0 8.47059V23.5294C0 28.2076 3.79241 32 8.47059 32H23.5294C28.2076 32 32 28.2076 32 23.5294V8.47059C32 3.79241 28.2076 0 23.5294 0Z"
      />
      <path
        className="fill-white dark:fill-black"
        d="M17.5667 9.21729H18.8111V18.2403C18.8255 19.1128 18.6 19.9726 18.159 20.7256C17.7241 21.4555 17.0968 22.0518 16.3458 22.4491C15.5717 22.8683 14.6722 23.0779 13.6473 23.0779C12.627 23.0779 11.7286 22.8672 10.9521 22.4457C10.2007 22.0478 9.5727 21.4518 9.13602 20.7223C8.6948 19.9705 8.4692 19.1118 8.48396 18.2403V9.21729H9.72854V18.1538C9.71656 18.8298 9.88417 19.4968 10.2143 20.0868C10.5362 20.6506 11.0099 21.1129 11.5814 21.421C12.1689 21.7448 12.8576 21.9067 13.6475 21.9067C14.4374 21.9067 15.1272 21.7448 15.7169 21.421C16.2895 21.1142 16.7635 20.6516 17.0844 20.0868C17.4124 19.4961 17.5788 18.8293 17.5667 18.1538V9.21729ZM23.6753 9.21729V22.845H22.4309V9.21729H23.6753Z"
      />
    </svg>
  );
};

export const TagIcon: React.FC<IconSvgProps> = (props) => {
  const { height = 40, width = 40 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      height={height}
      width={width}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        className="fill-black dark:fill-white"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
      />
      <path
        className="fill-white dark:fill-black"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6h.008v.008H6V6Z"
      />
    </svg>
  );
};

export function LineMdMoonFilledToSunnyFilledLoopTransition(
  props: Readonly<SVGProps<SVGSVGElement>>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={2}
          strokeDashoffset={2}
          d="M12 19v1M19 12h1M12 5v-1M5 12h-1"
        >
          <animate
            fill="freeze"
            attributeName="d"
            begin="1.2s"
            dur="0.2s"
            values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.2s"
            dur="0.2s"
            values="2;0"
          ></animate>
        </path>
        <path
          strokeDasharray={2}
          strokeDashoffset={2}
          d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5"
        >
          <animate
            fill="freeze"
            attributeName="d"
            begin="1.4s"
            dur="0.2s"
            values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.4s"
            dur="0.2s"
            values="2;0"
          ></animate>
        </path>
        <animateTransform
          attributeName="transform"
          dur="30s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </g>
      <g fill="currentColor">
        <path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            dur="0.4s"
            values="1;0"
          ></animate>
        </path>
        <path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="0.2s"
            dur="0.4s"
            values="1;0"
          ></animate>
        </path>
      </g>
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
      >
        <set fill="freeze" attributeName="opacity" begin="0.6s" to={0}></set>
      </path>
      <mask id="lineMdMoonFilledToSunnyFilledLoopTransition0">
        <circle cx={12} cy={12} r={12} fill="#fff"></circle>
        <circle cx={18} cy={6} r={12} fill="#fff">
          <animate
            fill="freeze"
            attributeName="cx"
            begin="0.6s"
            dur="0.4s"
            values="18;22"
          ></animate>
          <animate
            fill="freeze"
            attributeName="cy"
            begin="0.6s"
            dur="0.4s"
            values="6;2"
          ></animate>
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.6s"
            dur="0.4s"
            values="12;3"
          ></animate>
        </circle>
        <circle cx={18} cy={6} r={10}>
          <animate
            fill="freeze"
            attributeName="cx"
            begin="0.6s"
            dur="0.4s"
            values="18;22"
          ></animate>
          <animate
            fill="freeze"
            attributeName="cy"
            begin="0.6s"
            dur="0.4s"
            values="6;2"
          ></animate>
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.6s"
            dur="0.4s"
            values="10;1"
          ></animate>
        </circle>
      </mask>
      <circle
        cx={12}
        cy={12}
        r={10}
        mask="url(#lineMdMoonFilledToSunnyFilledLoopTransition0)"
        opacity={0}
        fill="currentColor"
      >
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.6s"
          dur="0.4s"
          values="10;6"
        ></animate>
        <set fill="freeze" attributeName="opacity" begin="0.6s" to={1}></set>
      </circle>
    </svg>
  );
}

export function LineMdSunnyFilledLoopToMoonFilledAltLoopTransition(
  props: Readonly<SVGProps<SVGSVGElement>>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray={4}
        strokeDashoffset={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
          <animate
            id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+4s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+3.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+5.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+1.8s"
            to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+3.8s"
            to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+5.8s"
            to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"
          ></set>
        </path>
        <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
          <animate
            id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+4s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+3.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+5.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+1.8s"
            to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+3.8s"
            to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+5.8s"
            to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"
          ></set>
        </path>
        <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
          <animate
            id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="2.8s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+2s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+3.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+1.8s"
            to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+5.8s"
            to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"
          ></set>
        </path>
      </g>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <g>
          <path
            strokeDasharray={2}
            strokeDashoffset={4}
            d="M12 21v1M21 12h1M12 3v-1M3 12h-1"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.2s"
              values="4;2"
            ></animate>
          </path>
          <path
            strokeDasharray={2}
            strokeDashoffset={4}
            d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.2s"
              dur="0.2s"
              values="4;2"
            ></animate>
          </path>
          <set fill="freeze" attributeName="opacity" begin="0.5s" to={0}></set>
        </g>
        <path
          fill="currentColor"
          d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
          opacity={0}
        >
          <set fill="freeze" attributeName="opacity" begin="0.5s" to={1}></set>
        </path>
      </g>
      <mask id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition3">
        <circle cx={12} cy={12} r={12} fill="#fff"></circle>
        <circle cx={22} cy={2} r={3} fill="#fff">
          <animate
            fill="freeze"
            attributeName="cx"
            begin="0.1s"
            dur="0.4s"
            values="22;18"
          ></animate>
          <animate
            fill="freeze"
            attributeName="cy"
            begin="0.1s"
            dur="0.4s"
            values="2;6"
          ></animate>
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            values="3;12"
          ></animate>
        </circle>
        <circle cx={22} cy={2} r={1}>
          <animate
            fill="freeze"
            attributeName="cx"
            begin="0.1s"
            dur="0.4s"
            values="22;18"
          ></animate>
          <animate
            fill="freeze"
            attributeName="cy"
            begin="0.1s"
            dur="0.4s"
            values="2;6"
          ></animate>
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            values="1;10"
          ></animate>
        </circle>
      </mask>
      <circle
        cx={12}
        cy={12}
        r={6}
        mask="url(#lineMdSunnyFilledLoopToMoonFilledAltLoopTransition3)"
        fill="currentColor"
      >
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          values="6;10"
        ></animate>
        <set fill="freeze" attributeName="opacity" begin="0.5s" to={0}></set>
      </circle>
    </svg>
  );
}

export function ColorBookmark(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#fluentColorBookmark200)"
          d="M4 4.5A2.5 2.5 0 0 1 6.5 2h7A2.5 2.5 0 0 1 16 4.5v13a.5.5 0 0 1-.794.404L10 14.118l-5.206 3.786A.5.5 0 0 1 4 17.5z"
        ></path>
        <defs>
          <linearGradient
            id="fluentColorBookmark200"
            x1={4}
            x2={12.653}
            y1={3.357}
            y2={14.354}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5EA2EF"></stop>
            <stop offset={1} stopColor="#0072F5"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}

export function ColorStar(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#fluentColorStar160)"
          d="M7.194 2.102a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.494a.9.9 0 0 1 .5 1.535l-2.462 2.4l.581 3.387a.9.9 0 0 1-1.306.948L8.001 12.35l-3.042 1.6A.9.9 0 0 1 3.653 13l.58-3.387l-2.46-2.399a.9.9 0 0 1 .499-1.535l3.4-.494z"
        ></path>
        <defs>
          <linearGradient
            id="fluentColorStar160"
            x1={14.5}
            x2={1.125}
            y1={14.332}
            y2={1.72}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff6f47"></stop>
            <stop offset={1} stopColor="#ffcd0f"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}

export function ColorHeart(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#fluentColorHeart160)"
          d="M7.541 3.948a3.25 3.25 0 0 0-4.595-.012a3.25 3.25 0 0 0 .012 4.595l4.707 4.708a.5.5 0 0 0 .707 0l4.683-4.68a3.25 3.25 0 0 0-.012-4.594a3.25 3.25 0 0 0-4.601-.012l-.447.448z"
        ></path>
        <defs>
          <linearGradient
            id="fluentColorHeart160"
            x1={-0.625}
            x2={5.702}
            y1={0.02}
            y2={13.424}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f97dbd"></stop>
            <stop offset={1} stopColor="#d7257d"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}
export function LineHeart(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <linearGradient
          id="fluentColorHeart160"
          x1={-0.625}
          x2={5.702}
          y1={0.02}
          y2={13.424}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f97dbd"></stop>
          <stop offset={1} stopColor="#d7257d"></stop>
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke="url(#fluentColorHeart160)"
        strokeDasharray={32}
        strokeDashoffset={32}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="2.1s"
          values="32;0"
        ></animate>
      </path>
    </svg>
  );
}

export function Person(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18s3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2z"
      ></path>
    </svg>
  );
}
export function ColorNews(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#fluentColorNews206)"
          d="M16 6a2 2 0 0 1 2 2v5.5a2.5 2.5 0 0 1-2 2.45l-.5.05V6z"
        ></path>
        <path
          fill="url(#fluentColorNews200)"
          d="M2 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10.95q-.243.05-.5.05h-11A2.5 2.5 0 0 1 2 13.5z"
        ></path>
        <path
          fill="url(#fluentColorNews201)"
          d="M2 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10.95q-.243.05-.5.05h-11A2.5 2.5 0 0 1 2 13.5z"
        ></path>
        <path
          fill="url(#fluentColorNews202)"
          d="M2 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10.95q-.243.05-.5.05h-11A2.5 2.5 0 0 1 2 13.5z"
        ></path>
        <path
          fill="url(#fluentColorNews203)"
          d="M5.5 9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"
        ></path>
        <path
          fill="url(#fluentColorNews204)"
          d="M10.5 9a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm-.5 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
        ></path>
        <path
          fill="url(#fluentColorNews205)"
          d="M5 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5"
        ></path>
        <defs>
          <linearGradient
            id="fluentColorNews200"
            x1={6}
            x2={16.578}
            y1={1}
            y2={15.055}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3bd5ff"></stop>
            <stop offset={1} stopColor="#367af2"></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorNews201"
            x1={10}
            x2={10}
            y1={13.5}
            y2={16}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.181} stopColor="#2764e7" stopOpacity={0}></stop>
            <stop offset={1} stopColor="#2764e7"></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorNews202"
            x1={9.5}
            x2={14.399}
            y1={7}
            y2={19.652}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#dcf8ff" stopOpacity={0}></stop>
            <stop offset={1} stopColor="#ff6ce8" stopOpacity={0.7}></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorNews203"
            x1={5.382}
            x2={7.382}
            y1={8.804}
            y2={12.809}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#defcff"></stop>
            <stop offset={1} stopColor="#9ff0f9"></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorNews204"
            x1={10.262}
            x2={11.133}
            y1={9.07}
            y2={13.28}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fdfdfd"></stop>
            <stop offset={1} stopColor="#cceaff"></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorNews205"
            x1={5.7}
            x2={5.721}
            y1={6.018}
            y2={7.115}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fdfdfd"></stop>
            <stop offset={1} stopColor="#cceaff"></stop>
          </linearGradient>
          <radialGradient
            id="fluentColorNews206"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="rotate(126.027 7.84 8.715)scale(6.80074 9.8598)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#068beb"></stop>
            <stop offset={0.617} stopColor="#0056cf"></stop>
            <stop offset={0.974} stopColor="#0027a7"></stop>
          </radialGradient>
        </defs>
      </g>
    </svg>
  );
}

export const Rank = ({
  text,
  props,
}: {
  text: string;
  props: Readonly<SVGProps<SVGSVGElement>>;
}) => {
  return (
    <div className="overflow-clip flex justify-end rounded-sm -z-50 absolute w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        width={96}
        height={96}
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        style={{ backgroundColor: "transparent" }}
        {...props}
      >
        <defs>
          <linearGradient
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="1"
            spreadMethod="pad"
            gradientUnits="objectBoundingBox"
            gradientTransform="translate(0 0)"
          >
            <stop
              id="eguEFm85kjZ6-fill-0"
              offset="0%"
              stopColor="rgba(255,255,255,0)"
            />
            <stop id="eguEFm85kjZ6-fill-1" offset="100%" stopColor="#010022" />
          </linearGradient>
        </defs>
        <g id="eguEFm85kjZ2" transform="translate(49.999994 49.856806)">
          <path
            d="M93.68,5.155c3.679164-3.000422,8.960836-3.000422,12.64,0l7.933,6.47c2.496417,2.03559,5.820401,2.74431,8.93,1.904l9.856-2.664c4.576717-1.237178,9.39315.909399,11.533,5.14l4.657,9.21c1.449331,2.86597,4.186969,4.861443,7.359,5.364l10.129,1.605c4.667143.739444,8.179682,4.64486,8.422,9.364l.533,10.39c.164099,3.194856,1.846835,6.118362,4.527,7.865l8.666,5.649c3.946344,2.572893,5.561758,7.551185,3.878,11.951l-3.728,9.743c-1.141072,2.980782-.790714,6.327198.943,9.007l5.66,8.746c2.557488,3.95306,2.011091,9.15466-1.312,12.49l-7.33,7.359c-2.254297,2.262721-3.291818,5.46633-2.792,8.621l1.631,10.299c.736534,4.659367-1.882191,9.200046-6.284,10.896l-9.61,3.7c-2.991107,1.151721-5.248981,3.667287-6.072,6.765l-2.661,10.018c-1.21507,4.575325-5.471835,7.671799-10.199,7.419l-10.209-.546c-3.21262-.172164-6.311868,1.211855-8.328,3.719l-6.438,8.008c-2.974052,3.699077-8.138649,4.797927-12.361,2.63l-9.086-4.665c-2.866977-1.471062-6.267023-1.471062-9.134,0l-9.087,4.665c-4.222047,2.167782-9.386288,1.068919-12.36-2.63l-6.438-8.008c-2.016132-2.507145-5.11538-3.891164-8.328-3.719l-10.209.546c-4.727531.253287-8.984855-2.84329-10.2-7.419l-2.66-10.018c-.822871-3.097793-3.080797-5.613417-6.072-6.765l-9.61-3.7c-4.402599-1.695031-7.021728-6.236412-6.284-10.896l1.631-10.299c.499486-3.154644-.537988-6.358105-2.792-8.621l-7.33-7.359c-3.323091-3.33534-3.869488-8.53694-1.312-12.49l5.66-8.746c1.733714-2.679802,2.084072-6.026218.943-9.007L7.257,77.403c-1.683758-4.399815-.068344-9.378107,3.878-11.951l8.666-5.649c2.680165-1.746638,4.362901-4.670144,4.527-7.865l.533-10.39c.242318-4.71914,3.754857-8.624556,8.422-9.364l10.129-1.605c3.172031-.502557,5.909669-2.49803,7.359-5.364l4.657-9.21c2.13985-4.230601,6.956283-6.377178,11.533-5.14l9.856,2.664c3.109589.84065,6.43373.131897,8.93-1.904l7.933-6.47Z"
            fill="#006fee"
          />
        </g>
        <text
          id="eguEFm85kjZ4"
          style={{ isolation: "isolate" }}
          dx="0"
          dy="0"
          fontFamily='"eguEFm85kjZ1:::Oswald"'
          fontSize={text.length > 3 ? "48" : "64"}
          fontWeight="900"
          letterSpacing="2"
          transform="translate(109.898445 168.350775)"
          fill="#fff"
          strokeWidth="0"
          className="ft"
        >
          {text}
          <tspan y="0" fontWeight="900" strokeWidth="0"></tspan>
        </text>
      </svg>
    </div>
  );
};

export function EyeIcon(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 64 64"
      {...props}
    >
      <path
        fill="#006fee"
        d="M55.6 41.7c4-4.4 6.4-8.9 6.4-11.5C62 24.3 48.6 7 32 7S2 24.3 2 30.2s13.4 23.2 30 23.2c4.6 0 9-1.3 12.9-3.4l10.7 7z"
      ></path>
      <circle cx={32} cy={30.2} r={15} fill="#fff"></circle>
      <path
        fill="#006fee"
        d="M32 21.2c-1 0-1.9.2-2.8.4c1.1.9 1.8 2.3 1.8 3.8c0 2.8-2.2 5-5 5c-1.1 0-2.1-.4-3-1v.7c0 5 4 9 9 9s9-4 9-9s-4-8.9-9-8.9"
      ></path>
    </svg>
  );
}

export function ArrowUp(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v14m6-8l-6-6m-6 6l6-6"
      ></path>
    </svg>
  );
}

export function ColorDismiss(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#fluentColorDismissCircle240)"
          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2"
        ></path>
        <path
          fill="url(#fluentColorDismissCircle241)"
          d="m15.53 8.47l-.084-.073a.75.75 0 0 0-.882-.007l-.094.08L12 10.939l-2.47-2.47l-.084-.072a.75.75 0 0 0-.882-.007l-.094.08l-.073.084a.75.75 0 0 0-.007.882l.08.094L10.939 12l-2.47 2.47l-.072.084a.75.75 0 0 0-.007.882l.08.094l.084.073a.75.75 0 0 0 .882.007l.094-.08L12 13.061l2.47 2.47l.084.072a.75.75 0 0 0 .882.007l.094-.08l.073-.084a.75.75 0 0 0 .007-.882l-.08-.094L13.061 12l2.47-2.47l.072-.084a.75.75 0 0 0 .007-.882z"
        ></path>
        <defs>
          <linearGradient
            id="fluentColorDismissCircle240"
            x1={5.125}
            x2={18.25}
            y1={3.25}
            y2={22.625}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f83f54"></stop>
            <stop offset={1} stopColor="#ca2134"></stop>
          </linearGradient>
          <linearGradient
            id="fluentColorDismissCircle241"
            x1={8.685}
            x2={12.591}
            y1={12.332}
            y2={16.392}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fdfdfd"></stop>
            <stop offset={1} stopColor="#fecbe6"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}
