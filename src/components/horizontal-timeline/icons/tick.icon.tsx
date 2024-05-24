import { ComponentProps } from 'react';

const TickIcon = (props: ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 12 9"
    fill="none"
    {...props}
  >
    <path
      d="M10.125 1.75L4.62188 7L1.875 4.375"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
);

export default TickIcon;
