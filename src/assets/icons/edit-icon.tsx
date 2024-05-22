import { ComponentProps } from 'react';

const EditIcon = (props: ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.79375 13.4999H3C2.86739 13.4999 2.74022 13.4473 2.64645 13.3535C2.55268 13.2597 2.5 13.1326 2.5 12.9999V10.2062C2.49978 10.1413 2.51236 10.0769 2.53702 10.0169C2.56169 9.95682 2.59796 9.90222 2.64375 9.85619L10.1438 2.3562C10.1903 2.30895 10.2457 2.27144 10.3069 2.24583C10.3681 2.22022 10.4337 2.20703 10.5 2.20703C10.5663 2.20703 10.632 2.22022 10.6931 2.24583C10.7543 2.27144 10.8097 2.30895 10.8563 2.3562L13.6438 5.1437C13.691 5.19022 13.7285 5.24568 13.7541 5.30684C13.7797 5.368 13.7929 5.43364 13.7929 5.49995C13.7929 5.56625 13.7797 5.63189 13.7541 5.69305C13.7285 5.75421 13.691 5.80967 13.6438 5.85619L6.14375 13.3562C6.09773 13.402 6.04313 13.4383 5.98307 13.4629C5.92301 13.4876 5.85868 13.5002 5.79375 13.4999V13.4999Z"
      stroke="#2D68FE"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8.5 4L12 7.5" stroke="#2D68FE" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10.25 5.75L4.25 11.75"
      stroke="#2D68FE"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.96875 13.4688L2.53125 10.0312"
      stroke="#2D68FE"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditIcon;
