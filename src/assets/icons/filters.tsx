import { ComponentProps } from 'react';

const Filters = (props: ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4 8H12" stroke="#1B1C1E" strokeLinecap="square" strokeLinejoin="round" />
    <path d="M1.5 5H14.5" stroke="#1B1C1E" strokeLinecap="square" strokeLinejoin="round" />
    <path d="M6.5 11H9.5" stroke="#1B1C1E" strokeLinecap="square" strokeLinejoin="round" />
  </svg>
);

export default Filters;
