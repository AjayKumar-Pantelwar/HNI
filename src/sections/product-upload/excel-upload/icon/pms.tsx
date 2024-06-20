import { ComponentProps } from 'react';

const PMS = (props: ComponentProps<'svg'>) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 8H16.5333C13.5464 8 12.0529 8 10.9121 8.5813C9.90852 9.09262 9.09263 9.90852 8.5813 10.9121C8 12.0529 8 13.5464 8 16.5333V31.4667C8 34.4536 8 35.9471 8.5813 37.0879C9.09263 38.0915 9.90852 38.9074 10.9121 39.4187C12.0529 40 13.5464 40 16.5333 40H31.4667C34.4536 40 35.9471 40 37.0879 39.4187C38.0915 38.9074 38.9074 38.0915 39.4187 37.0879C40 35.9471 40 34.4536 40 31.4667V24M31.1111 25.7778V32.8889M16.8889 22.2222V32.8889M24 15.1111V32.8889"
      stroke="#1B1C1E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.9997 17.3333C36.577 17.3333 38.6664 15.244 38.6664 12.6667C38.6664 10.0893 36.577 8 33.9997 8C31.4223 8 29.333 10.0893 29.333 12.6667C29.333 15.244 31.4223 17.3333 33.9997 17.3333Z"
      stroke="#FD7740"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37.2998 15.9663L39.9998 18.6663"
      stroke="#FD7740"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

export default PMS;
