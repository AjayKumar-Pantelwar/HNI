import { ComponentProps } from 'react';

const KeyIcon = (props: ComponentProps<'svg'>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1614_26587)">
      <path
        d="M22.73 18.0403L14.262 9.40949C15.0303 5 12.7421 2.73282 11.4936 2.08144C9.53252 0.952312 7.75936 0.806335 6.26121 1.19239C1.84306 2.3309 -0.134813 8.762 2.94397 12.1291C4.69038 14.0391 7.43922 14.3579 9.21379 14.132L10.8422 15.7605H13.2849V18.0403H15.7276V20.483H18.1703V22.7628H22.73V18.0403Z"
        stroke="black"
      />
      <circle
        cx="1.7913"
        cy="1.7913"
        r="1.7913"
        transform="matrix(-1 0 0 1 9.03026 4)"
        stroke="black"
      />
      <path d="M12.6335 10.7119L20.7758 18.8542" stroke="black" />
    </g>
    <defs>
      <clipPath id="clip0_1614_26587">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default KeyIcon;
