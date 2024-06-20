import { ComponentProps } from 'react';

const AIF = (props: ComponentProps<'svg'>) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M39 12L24 27L18 21L6 33"
      stroke="#FD7740"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42 39H6V9"
      stroke="#1B1C1E"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M39 19.5V12H31.5"
      stroke="#FD7740"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AIF;
