import { ComponentProps } from 'react';

const ProductUpload = (props: ComponentProps<'svg'> & { selectedColor?: string }) => {
  const { selectedColor = '#1B1C1E', ...rest } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 5.5V17.5M11.5 8.5V17.5M16 11.5V17.5M20.5 14.5V17.5"
        stroke={selectedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProductUpload;
