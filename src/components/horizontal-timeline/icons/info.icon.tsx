import { ComponentProps } from 'react';

const InfoIcon = (props: ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 2 11"
    fill="none"
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M1.75 3.5V10.25H0.25V3.5H1.75Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M1.75 0.5V2H0.25V0.5H1.75Z" fill="white" />
  </svg>
);

export default InfoIcon;
