import React from "react";

const LeftToggle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="24"
      viewBox="0 0 44 24"
      fill="none"
    >
      <rect
        x="44"
        y="24"
        width="44"
        height="24"
        rx="12"
        transform="rotate(-180 44 24)"
        fill="url(#paint0_linear_3521_26178)"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        transform="rotate(-180 12 12)"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3521_26178"
          x1="44"
          y1="36"
          x2="89.1161"
          y2="36.5394"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#808080" />
          <stop offset="1" stopColor="#808080" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LeftToggle;
