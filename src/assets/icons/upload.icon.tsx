import React from 'react';

export const UploadIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_1_25)">
      <circle cx="26.0547" cy="25" r="16" fill="white" />
    </g>
    <path
      d="M33.2555 27.4004V30.6004C33.2555 31.0247 33.0869 31.4317 32.7868 31.7318C32.4868 32.0318 32.0798 32.2004 31.6555 32.2004H20.4555C20.0311 32.2004 19.6242 32.0318 19.3241 31.7318C19.024 31.4317 18.8555 31.0247 18.8555 30.6004V27.4004"
      stroke="#FD7740"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.0547 21.8008L26.0547 17.8008L22.0547 21.8008"
      stroke="#FD7740"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.0547 17.8008V27.4008"
      stroke="#FD7740"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_1_25"
        x="0.454687"
        y="0.2"
        width="51.2"
        height="51.2"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.8" />
        <feGaussianBlur stdDeviation="4.8" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_25" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_25" result="shape" />
      </filter>
    </defs>
  </svg>
);
