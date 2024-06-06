import { ComponentProps } from 'react';

const DownloadIcon = (props: ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.375 7.875L8 10.5L10.625 7.875"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 3.5V10.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M13.5 9.5V13C13.5 13.1326 13.4473 13.2598 13.3536 13.3536C13.2598 13.4473 13.1326 13.5 13 13.5H3C2.86739 13.5 2.74021 13.4473 2.64645 13.3536C2.55268 13.2598 2.5 13.1326 2.5 13V9.5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DownloadIcon;
