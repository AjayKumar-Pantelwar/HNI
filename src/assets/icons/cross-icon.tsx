import { ComponentProps } from 'react';

const CrossIcon = (props: ComponentProps<'svg'>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      fill="#BB251A"
      stroke="#BB251A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="8.46967" y1="15.4697" x2="15.4697" y2="8.46967" stroke="white" strokeWidth="1.5" />
    <line x1="8.53033" y1="8.46967" x2="15.5303" y2="15.4697" stroke="white" strokeWidth="1.5" />
  </svg>
);

export default CrossIcon;
