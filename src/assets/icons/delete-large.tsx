import { ComponentProps } from 'react';

const DeleteLarge = (props: ComponentProps<'svg'>) => (
  <svg
    width="65"
    height="64"
    viewBox="0 0 65 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_dd_968_25091)">
      <path
        d="M14.5 51V17C14.5 15.3431 15.8431 14 17.5 14H19.5C21.1569 14 22.5 12.6569 22.5 11V10.2426C22.5 9.44699 22.8161 8.68393 23.3787 8.12132L25.1213 6.37868C25.6839 5.81607 26.447 5.5 27.2426 5.5H38.1202C38.996 5.5 39.828 5.88269 40.398 6.54763L41.7778 8.1574C42.2438 8.70113 42.5 9.39364 42.5 10.1098V11.7156C42.5 12.906 43.5768 13.8067 44.7485 13.5964L50.0715 12.641C51.6267 12.3619 52.2717 14.5535 50.8131 15.1612C50.3207 15.3664 50 15.8475 50 16.3809V51C50 52.6569 48.6569 54 47 54H17.5C15.8431 54 14.5 52.6569 14.5 51Z"
        fill="white"
      />
    </g>
    <path
      d="M42.5006 14V10C42.5006 8.93913 42.0792 7.92172 41.329 7.17157C40.5789 6.42143 39.5615 6 38.5006 6H26.5006C25.4397 6 24.4223 6.42143 23.6722 7.17157C22.922 7.92172 22.5006 8.93913 22.5006 10V14"
      stroke="#BB251A"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M54.5006 14H10.5006"
      stroke="#BB251A"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.5006 26V42"
      stroke="#BB251A"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.5006 26V42"
      stroke="#BB251A"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50.5006 14V52C50.5006 52.5304 50.2899 53.0391 49.9148 53.4142C49.5398 53.7893 49.031 54 48.5006 54H16.5006C15.9702 54 15.4615 53.7893 15.0864 53.4142C14.7113 53.0391 14.5006 52.5304 14.5006 52V14"
      stroke="#BB251A"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_dd_968_25091"
        x="14.5"
        y="5.5"
        width="45.1306"
        height="52.5"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="8" dy="4" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.782015 0 0 0 0 0.782015 0 0 0 0 0.782015 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_968_25091" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="5" dy="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.733333 0 0 0 0 0.145098 0 0 0 0 0.101961 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_968_25091"
          result="effect2_dropShadow_968_25091"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_968_25091"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default DeleteLarge;
