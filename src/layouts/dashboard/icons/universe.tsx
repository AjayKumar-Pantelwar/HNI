import { ComponentProps } from 'react';

const Universe = (props: ComponentProps<'svg'>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" fill="white" />
    <path
      d="M20.8037 11.9999C20.8037 9.7583 19.959 7.62192 18.4251 5.98433C18.4246 5.98411 18.4246 5.98367 18.4242 5.98345C16.7649 4.2121 14.4231 3.19629 11.9999 3.19629C9.57666 3.19629 7.23514 4.2121 5.57603 5.98345C4.04144 7.62148 3.19629 9.75808 3.19629 11.9999C3.19629 14.2419 4.04166 16.3787 5.57603 18.0163C7.23492 19.7875 9.57666 20.8037 12.0001 20.8037C12.0003 20.8037 12.0005 20.8037 12.0008 20.8037C12.0008 20.8037 12.0008 20.8037 12.001 20.8037C14.424 20.8035 16.7649 19.7877 18.4242 18.0166C18.4246 18.0163 18.4246 18.0159 18.4251 18.0157C19.959 16.3781 20.8037 14.2417 20.8037 11.9999ZM18.1301 17.1916C18.1145 17.1765 18.0978 17.1622 18.0818 17.147C18.0436 17.1106 18.004 17.0754 17.9652 17.0396C17.8828 16.9636 17.7991 16.8887 17.7137 16.816C17.6687 16.7774 17.6232 16.7396 17.5773 16.702C17.4927 16.6329 17.4073 16.5656 17.3203 16.4995C17.2751 16.4653 17.2303 16.4306 17.1844 16.397C17.0835 16.3234 16.9805 16.2527 16.8769 16.1833C16.8444 16.1615 16.8125 16.1387 16.78 16.1174C16.6427 16.0284 16.5028 15.9432 16.3612 15.8622C16.3284 15.8435 16.2948 15.8266 16.2621 15.8083C16.1519 15.7473 16.0405 15.6878 15.9278 15.6311C15.8775 15.6058 15.8261 15.5819 15.7752 15.5577C15.677 15.511 15.5784 15.4657 15.4782 15.4227C15.4235 15.3994 15.3689 15.3761 15.3137 15.3537C15.2757 15.3383 15.2386 15.3212 15.2004 15.306C15.2151 15.2065 15.2259 15.1042 15.2395 15.0036C15.2538 14.8955 15.2689 14.7879 15.2812 14.6785C15.301 14.5103 15.3168 14.3399 15.3322 14.1692C15.3416 14.0666 15.3524 13.965 15.3601 13.8615C15.3752 13.6636 15.3858 13.4631 15.3957 13.2621C15.3994 13.1839 15.4051 13.1066 15.4082 13.028C15.4187 12.7535 15.4244 12.4765 15.4249 12.1976H20.0326C19.9878 14.0379 19.319 15.7903 18.1301 17.1916ZM14.2722 16.1284C14.2555 16.2087 14.2388 16.2887 14.2208 16.3675C14.2046 16.4409 14.1872 16.5129 14.1699 16.5845C14.1514 16.6612 14.1325 16.737 14.1128 16.8116C14.0948 16.8815 14.0759 16.9504 14.057 17.0185C14.0366 17.0912 14.0159 17.1631 13.9948 17.2336C13.9751 17.2999 13.9549 17.3651 13.9346 17.4292C13.9125 17.498 13.8903 17.5659 13.8677 17.6324C13.8464 17.6943 13.8253 17.7556 13.8035 17.8156C13.78 17.8804 13.7561 17.9434 13.7319 18.0058C13.7095 18.0636 13.6873 18.1204 13.6641 18.176C13.6392 18.2362 13.6138 18.2946 13.5885 18.3524C13.5652 18.4053 13.5417 18.458 13.5178 18.509C13.4916 18.5648 13.4651 18.6181 13.4383 18.6711C13.4141 18.7192 13.3895 18.7673 13.3649 18.8132C13.3375 18.8639 13.3096 18.912 13.2815 18.9601C13.2566 19.0029 13.2316 19.0464 13.2063 19.0868C13.1776 19.133 13.1484 19.1756 13.1194 19.2186C13.0941 19.2559 13.0688 19.2942 13.0429 19.3291C13.0128 19.3699 12.9825 19.4068 12.9522 19.4444C12.9267 19.476 12.901 19.509 12.8751 19.5382C12.8437 19.5735 12.8123 19.6045 12.7807 19.6359C12.755 19.6618 12.7297 19.6893 12.7038 19.7128C12.6713 19.7422 12.6381 19.7668 12.6052 19.7923C12.5804 19.8121 12.5551 19.8336 12.5299 19.8509C12.4949 19.8747 12.4602 19.8929 12.4249 19.912C12.4014 19.9252 12.3777 19.9408 12.3542 19.9517C12.3151 19.9698 12.2758 19.9814 12.2364 19.9933C12.2169 19.9994 12.1971 20.0089 12.1774 20.0135C12.1181 20.0273 12.059 20.0348 12.0001 20.0348C11.941 20.0348 11.8817 20.0273 11.8224 20.0135C11.8029 20.0089 11.7833 19.9996 11.7636 19.9935C11.724 19.9812 11.6849 19.9698 11.6456 19.9517C11.6221 19.941 11.5988 19.9254 11.5758 19.9127C11.5402 19.8931 11.5051 19.8749 11.4699 19.8509C11.4453 19.8342 11.4209 19.8127 11.3963 19.7938C11.3627 19.7677 11.3291 19.7427 11.296 19.7123C11.2709 19.6895 11.2459 19.6629 11.2211 19.6379C11.189 19.6056 11.1565 19.5738 11.1246 19.5377C11.0994 19.5092 11.0746 19.4773 11.0498 19.4466C11.0186 19.4082 10.9874 19.3702 10.9568 19.3284C10.9318 19.2946 10.907 19.2575 10.8826 19.2215C10.8525 19.1773 10.8226 19.1334 10.793 19.0859C10.7686 19.0466 10.7445 19.0049 10.7203 18.9634C10.6913 18.9138 10.6625 18.8641 10.6342 18.8116C10.6105 18.7675 10.587 18.7209 10.5635 18.6746C10.536 18.6199 10.5084 18.5648 10.4813 18.507C10.4585 18.458 10.4357 18.4071 10.4128 18.3559C10.3867 18.2964 10.3605 18.2357 10.3348 18.1734C10.3124 18.1198 10.2911 18.0644 10.2692 18.0089C10.2446 17.9447 10.2198 17.8797 10.1958 17.8132C10.1747 17.7547 10.1539 17.6952 10.1332 17.6348C10.1102 17.5663 10.0871 17.4969 10.0645 17.4262C10.0447 17.3638 10.0249 17.3005 10.0056 17.2364C9.98409 17.1639 9.963 17.0904 9.94214 17.0157C9.92369 16.9489 9.90524 16.8817 9.88723 16.8132C9.86746 16.737 9.84813 16.6597 9.82924 16.5817C9.81233 16.5114 9.79542 16.4405 9.77895 16.3686C9.76094 16.2889 9.74381 16.2079 9.72689 16.1262C9.71152 16.0519 9.69593 15.9777 9.68143 15.9019C9.67616 15.8745 9.67133 15.8461 9.66628 15.8184C9.66803 15.8178 9.66979 15.8171 9.67133 15.8167C9.83605 15.7666 10.0028 15.7242 10.1699 15.6851C10.207 15.6766 10.2437 15.6673 10.281 15.6594C10.4385 15.625 10.5969 15.5962 10.7559 15.5714C10.8005 15.5646 10.8451 15.5577 10.8896 15.5518C11.0478 15.5296 11.2061 15.5118 11.3654 15.4993C11.4067 15.496 11.4477 15.4945 11.489 15.4916C11.6425 15.482 11.7961 15.476 11.9498 15.4749C11.9832 15.4747 12.0166 15.4747 12.05 15.4749C12.2039 15.4758 12.3577 15.482 12.5116 15.4919C12.5525 15.4945 12.5933 15.4962 12.634 15.4993C12.7934 15.5121 12.9524 15.5301 13.1108 15.5518C13.1549 15.558 13.1991 15.5643 13.2432 15.5711C13.4029 15.596 13.5617 15.6252 13.7198 15.6594C13.7561 15.6673 13.7921 15.6763 13.8281 15.6849C13.9964 15.724 14.1631 15.7666 14.3285 15.8167C14.33 15.8174 14.3317 15.8178 14.3331 15.8184C14.328 15.8459 14.3232 15.8742 14.3179 15.9017C14.3034 15.9788 14.288 16.0537 14.2722 16.1284ZM9.78707 7.92545C9.80486 7.84748 9.82243 7.76973 9.84088 7.69374C9.85758 7.62631 9.87471 7.56086 9.89184 7.49519C9.91095 7.42161 9.93028 7.34826 9.95026 7.27665C9.96827 7.21252 9.98672 7.14993 10.0054 7.08755C10.0263 7.01793 10.0469 6.94896 10.0686 6.88153C10.0878 6.82091 10.1075 6.76139 10.1275 6.70275C10.1495 6.63752 10.1717 6.57317 10.1945 6.51013C10.2151 6.45303 10.236 6.39702 10.2571 6.34167C10.2804 6.28083 10.3041 6.22109 10.3278 6.16267C10.3498 6.10974 10.3715 6.05746 10.3937 6.00629C10.4181 5.94984 10.4433 5.89494 10.4682 5.84091C10.491 5.79215 10.5136 5.74405 10.5365 5.69748C10.5622 5.64543 10.5883 5.59513 10.6147 5.54572C10.6379 5.50157 10.6614 5.45786 10.6852 5.41569C10.7117 5.36825 10.7392 5.32323 10.7664 5.27864C10.7901 5.23933 10.8143 5.20001 10.8387 5.16267C10.8666 5.12029 10.8949 5.08053 10.9232 5.04078C10.9476 5.00651 10.972 4.97159 10.9966 4.93953C11.0258 4.90175 11.055 4.86771 11.0842 4.83322C11.1088 4.80401 11.1334 4.77414 11.1583 4.74735C11.1886 4.71484 11.2191 4.68629 11.2496 4.65708C11.274 4.63358 11.2986 4.60854 11.323 4.58745C11.3548 4.56022 11.3865 4.53738 11.4185 4.51387C11.4422 4.49608 11.4664 4.47632 11.4903 4.46072C11.5237 4.43898 11.5578 4.42251 11.5912 4.40494C11.614 4.39286 11.6366 4.37858 11.6595 4.3687C11.6972 4.35244 11.7348 4.3419 11.7723 4.3307C11.7917 4.32521 11.8106 4.31664 11.8299 4.31225C11.8866 4.29973 11.9437 4.29292 12.0003 4.29292C12.057 4.29292 12.1143 4.29973 12.1708 4.31225C12.1899 4.31664 12.2088 4.32521 12.2279 4.3307C12.2656 4.34168 12.3034 4.35222 12.3412 4.3687C12.3636 4.37858 12.386 4.39264 12.4086 4.40428C12.4425 4.42207 12.4765 4.43876 12.5103 4.46094C12.534 4.47632 12.5575 4.49565 12.5813 4.51322C12.6133 4.53694 12.6458 4.56 12.6775 4.58767C12.7018 4.60854 12.726 4.63314 12.7499 4.65642C12.7809 4.68585 12.8117 4.71484 12.8422 4.74779C12.8668 4.77414 12.8912 4.80379 12.9153 4.83234C12.9452 4.86727 12.9748 4.90197 13.0038 4.94019C13.0282 4.97181 13.0524 5.0063 13.0765 5.0399C13.1051 5.08009 13.1339 5.12029 13.162 5.16333C13.1859 5.20001 13.2099 5.23911 13.2334 5.27776C13.261 5.32301 13.2887 5.36847 13.3157 5.41657C13.339 5.45786 13.3621 5.50135 13.3851 5.54484C13.4117 5.59491 13.4381 5.64565 13.464 5.69836C13.4868 5.74449 13.5092 5.79215 13.5316 5.84025C13.5571 5.89472 13.5819 5.95028 13.607 6.00761C13.6289 6.0579 13.6507 6.10974 13.6722 6.16223C13.6961 6.22153 13.7203 6.28171 13.7438 6.34321C13.7644 6.39768 13.7851 6.45303 13.8055 6.50947C13.8283 6.57317 13.851 6.63818 13.8734 6.70407C13.8931 6.76271 13.9125 6.82157 13.9318 6.88197C13.9533 6.94962 13.9742 7.0188 13.995 7.08843C14.0137 7.15058 14.0319 7.21296 14.0497 7.27687C14.0699 7.34891 14.0897 7.42271 14.109 7.49695C14.1257 7.56196 14.1429 7.62719 14.1593 7.69374C14.1782 7.77017 14.1958 7.84836 14.2138 7.92677C14.2292 7.99486 14.2448 8.06251 14.2595 8.13213C14.2641 8.15453 14.2683 8.17759 14.2731 8.2C14.2696 8.20088 14.2663 8.20175 14.2628 8.20285C14.1033 8.24963 13.9421 8.28983 13.7802 8.32651C13.7464 8.33397 13.7124 8.34232 13.6786 8.34957C13.5242 8.38229 13.3689 8.40975 13.2131 8.43369C13.1699 8.44006 13.1264 8.44643 13.0829 8.45236C12.9287 8.47322 12.7743 8.49013 12.6195 8.50221C12.5786 8.50529 12.538 8.50705 12.4971 8.50946C12.3482 8.51869 12.1991 8.5244 12.0497 8.5255C12.0172 8.52571 11.9843 8.52571 11.9516 8.5255C11.8022 8.5244 11.6531 8.51869 11.5037 8.50946C11.4631 8.50705 11.4227 8.50507 11.3823 8.50221C11.227 8.49013 11.0726 8.47322 10.9184 8.45236C10.8749 8.44665 10.8314 8.44028 10.7882 8.43369C10.6324 8.41019 10.4772 8.38273 10.323 8.34957C10.2889 8.34254 10.2549 8.33419 10.2209 8.32651C10.0585 8.28961 9.89711 8.24941 9.73722 8.20263C9.73414 8.20153 9.73129 8.20088 9.72821 8.2C9.73282 8.17759 9.73678 8.15453 9.74161 8.13213C9.75589 8.06163 9.77126 7.99354 9.78707 7.92545ZM13.9362 14.9219C13.8951 14.9125 13.8543 14.9026 13.8132 14.8938C13.6614 14.8619 13.5083 14.8354 13.3553 14.8119C13.2876 14.8013 13.2202 14.791 13.1521 14.782C13.0052 14.7627 12.858 14.7469 12.7104 14.7348C12.6349 14.7288 12.5591 14.7249 12.4835 14.7207C12.3737 14.715 12.2639 14.7111 12.1541 14.7091C12.1027 14.7082 12.0513 14.7038 11.9997 14.7038C11.9483 14.7038 11.8967 14.7084 11.8453 14.7091C11.7354 14.7111 11.6261 14.7148 11.5163 14.7207C11.4407 14.7251 11.3651 14.7288 11.2898 14.7348C11.1418 14.7469 10.9944 14.7627 10.8475 14.782C10.7796 14.791 10.7122 14.8011 10.6445 14.8119C10.4906 14.8356 10.3366 14.8622 10.1835 14.8942C10.1438 14.9028 10.1044 14.9127 10.0645 14.9215C9.91183 14.9557 9.75984 14.9944 9.60895 15.037C9.58743 15.0429 9.56568 15.0471 9.54416 15.0532C9.53428 14.9838 9.52307 14.9153 9.51407 14.8453C9.50133 14.7471 9.48925 14.6485 9.47805 14.549C9.4596 14.3875 9.44379 14.2243 9.42907 14.0603C9.4205 13.9641 9.4115 13.8685 9.40425 13.7719C9.39041 13.5874 9.38031 13.4009 9.37153 13.2136C9.36779 13.1361 9.3623 13.0596 9.35967 12.9817C9.35 12.7223 9.34495 12.4607 9.34451 12.1971H14.6555C14.655 12.4607 14.65 12.7225 14.6403 12.9817C14.6375 13.0592 14.6322 13.1352 14.6285 13.2123C14.6195 13.3998 14.6091 13.5865 14.5955 13.7712C14.5883 13.8683 14.5793 13.9643 14.5707 14.0605C14.5562 14.2241 14.5402 14.3869 14.5219 14.5481C14.5105 14.6478 14.4984 14.7469 14.4855 14.8455C14.4765 14.9153 14.4655 14.9838 14.4556 15.053C14.4337 15.0469 14.4115 15.0425 14.3897 15.0363C14.2395 14.9944 14.0886 14.9559 13.9362 14.9219ZM10.1703 9.10335C10.1749 9.10445 10.1796 9.10577 10.1842 9.10665C10.3726 9.14662 10.5628 9.17869 10.7537 9.20592C10.7704 9.20856 10.7871 9.21097 10.8038 9.21317C10.9955 9.23953 11.1883 9.25951 11.3818 9.27313C11.3891 9.27357 11.3963 9.27401 11.4036 9.27445C11.6019 9.28806 11.8007 9.29641 12.0001 9.29641C12.1995 9.29641 12.3983 9.28806 12.5964 9.27445C12.6041 9.27401 12.6118 9.27357 12.6195 9.27291C12.8125 9.25929 13.0045 9.23953 13.1956 9.21339C13.2131 9.21097 13.2307 9.20834 13.2483 9.2057C13.4383 9.17847 13.6276 9.1464 13.8154 9.10687C13.8209 9.10577 13.8264 9.10423 13.8316 9.10291C14.0084 9.06536 14.1839 9.02121 14.3579 8.97267C14.3746 8.96806 14.3917 8.96498 14.4084 8.95993C14.4209 9.03768 14.4345 9.1139 14.4457 9.19252C14.4565 9.26478 14.4673 9.33704 14.4767 9.40996C14.5053 9.62257 14.5305 9.83737 14.5523 10.0552C14.5553 10.0847 14.5591 10.1137 14.5617 10.1431C14.5852 10.3906 14.6032 10.6419 14.6179 10.8958C14.6221 10.9645 14.6247 11.0346 14.628 11.104C14.6331 11.2112 14.6357 11.3199 14.6395 11.4284H9.36076C9.36428 11.3197 9.36669 11.2103 9.37197 11.1025C9.37548 11.0333 9.3779 10.9632 9.38207 10.8945C9.39656 10.6415 9.41479 10.3904 9.43808 10.1435C9.44137 10.111 9.44554 10.0792 9.44884 10.0467C9.47036 9.83166 9.49518 9.61971 9.52307 9.40996C9.53296 9.33704 9.54372 9.26456 9.55404 9.19231C9.56568 9.11412 9.5793 9.0379 9.59182 8.96015C9.60851 8.96498 9.62608 8.96828 9.64277 8.97311C9.8176 9.02143 9.99309 9.0658 10.1703 9.10335ZM15.4126 11.4286C15.4084 11.3028 15.4007 11.1791 15.3948 11.0546C15.3908 10.9735 15.388 10.8918 15.3831 10.8112C15.3675 10.549 15.3484 10.2887 15.3236 10.0324C15.3214 10.0082 15.3181 9.98453 15.3155 9.96059C15.2924 9.72777 15.265 9.49826 15.2342 9.27093C15.2232 9.18967 15.2105 9.10994 15.1984 9.02912C15.183 8.92369 15.1688 8.81651 15.1516 8.71262C15.1899 8.69791 15.2272 8.68078 15.2654 8.66562C15.3212 8.643 15.3765 8.62016 15.4319 8.59666C15.5336 8.55361 15.6344 8.50836 15.7343 8.46136C15.7862 8.43698 15.8382 8.41282 15.8896 8.38756C16.0034 8.33134 16.115 8.27226 16.2259 8.2112C16.2606 8.19209 16.2959 8.17452 16.3306 8.15497C16.4747 8.07327 16.617 7.98739 16.7565 7.89756C16.7879 7.87735 16.8182 7.85561 16.8496 7.83497C16.9568 7.7638 17.0633 7.6911 17.1674 7.61533C17.2138 7.58195 17.2588 7.54702 17.3043 7.51254C17.3928 7.44555 17.4802 7.37747 17.5661 7.30718C17.6126 7.26919 17.659 7.23053 17.7049 7.19166C17.7908 7.11874 17.8747 7.04362 17.9577 6.96741C17.9983 6.93029 18.0392 6.89361 18.0789 6.85562C18.0956 6.8398 18.1136 6.82465 18.1301 6.80839C19.2382 8.11434 19.8944 9.72558 20.0148 11.4286H15.4126ZM17.6036 6.24393C17.5865 6.26085 17.5703 6.27842 17.5527 6.29511C17.5171 6.32915 17.4802 6.36254 17.4442 6.39592C17.3678 6.46598 17.2907 6.53473 17.212 6.60194C17.1729 6.6351 17.1338 6.66849 17.0941 6.70099C17.008 6.7715 16.9204 6.84002 16.8316 6.90701C16.8002 6.93051 16.7695 6.95533 16.7376 6.97839C16.617 7.06646 16.4943 7.15168 16.3691 7.23295C16.3438 7.2492 16.3181 7.26414 16.2926 7.28017C16.1912 7.3443 16.0884 7.40668 15.9847 7.46642C15.9414 7.49102 15.8977 7.51474 15.8543 7.53846C15.7638 7.58832 15.672 7.6362 15.5795 7.68232C15.5347 7.70494 15.4897 7.72734 15.4442 7.74909C15.3403 7.79873 15.2351 7.84529 15.1288 7.89053C15.0967 7.90437 15.0649 7.91908 15.0326 7.93204C15.0236 7.93578 15.0146 7.93863 15.0056 7.94215C15.001 7.9193 14.9955 7.89778 14.9906 7.87516C14.9832 7.84024 14.9753 7.80619 14.9676 7.77171C14.9353 7.62741 14.9015 7.48575 14.8663 7.34782C14.8617 7.33003 14.8576 7.31158 14.8529 7.29401C14.8141 7.14509 14.7737 7.00101 14.7315 6.85979C14.7216 6.82662 14.7117 6.79368 14.7016 6.76095C14.659 6.62127 14.6151 6.48443 14.5692 6.35331C14.5648 6.34101 14.5604 6.32959 14.556 6.31751C14.5129 6.19474 14.4681 6.07657 14.4225 5.96148C14.4117 5.93425 14.4009 5.9068 14.3899 5.88022C14.341 5.76074 14.2911 5.64499 14.2393 5.53386C14.2294 5.51233 14.2191 5.49191 14.209 5.4706C14.162 5.37155 14.1134 5.27557 14.0645 5.18354C14.0552 5.16619 14.0462 5.14818 14.0368 5.13105C13.9816 5.03045 13.9252 4.93469 13.8677 4.84311C13.8543 4.82202 13.8411 4.80182 13.8277 4.78139C13.7699 4.69222 13.7115 4.6059 13.6513 4.52574C13.6491 4.5231 13.6474 4.52024 13.6454 4.51761C13.5841 4.4359 13.5209 4.36057 13.4572 4.28831C13.4427 4.27206 13.428 4.2558 13.4135 4.23977C13.3544 4.17542 13.2946 4.11392 13.2338 4.05791C14.8806 4.30874 16.3928 5.06186 17.6036 6.24393ZM10.5868 4.23911C10.5718 4.25537 10.5567 4.27206 10.5422 4.28919C10.4785 4.36101 10.4157 4.4359 10.3544 4.51739C10.352 4.52068 10.3498 4.5242 10.3471 4.52749C10.2878 4.60678 10.2299 4.69222 10.1725 4.78051C10.1587 4.8016 10.1451 4.82224 10.1317 4.84399C10.0744 4.93513 10.0181 5.03024 9.96344 5.13039C9.95356 5.14818 9.94411 5.16685 9.93467 5.18508C9.88569 5.27645 9.83781 5.37155 9.79103 5.46994C9.7807 5.49147 9.77038 5.51233 9.76006 5.5343C9.70866 5.64521 9.65881 5.76052 9.60983 5.87956C9.59863 5.9068 9.58787 5.93469 9.57688 5.96236C9.53142 6.07679 9.48705 6.1943 9.44401 6.31597C9.43961 6.32893 9.435 6.34079 9.43039 6.35375C9.3847 6.48487 9.341 6.62149 9.29817 6.76073C9.28807 6.79368 9.27818 6.82684 9.26808 6.86023C9.22635 7.00123 9.1855 7.14509 9.14684 7.29379C9.14223 7.31202 9.13784 7.3309 9.133 7.34913C9.09786 7.48663 9.06426 7.62807 9.03219 7.77193C9.0245 7.80619 9.01638 7.84046 9.00891 7.87538C9.00408 7.898 8.99881 7.91952 8.99397 7.94237C8.98519 7.93885 8.97618 7.936 8.96718 7.93226C8.93489 7.91908 8.90305 7.90437 8.87098 7.89075C8.7649 7.84573 8.65969 7.79894 8.5558 7.74931C8.51034 7.72756 8.46531 7.70516 8.42029 7.68254C8.32782 7.63642 8.23624 7.58832 8.14575 7.53868C8.10204 7.51496 8.05855 7.49124 8.01528 7.46664C7.9114 7.40712 7.80905 7.34474 7.70758 7.28039C7.6821 7.26436 7.6564 7.24942 7.63092 7.23295C7.50573 7.1519 7.38296 7.06668 7.26238 6.97883C7.23053 6.95555 7.19978 6.93051 7.16794 6.90679C7.07942 6.84002 6.99201 6.77193 6.90635 6.70143C6.86616 6.66871 6.82706 6.6351 6.78753 6.60172C6.70956 6.53495 6.63269 6.46686 6.55713 6.39724C6.52023 6.3632 6.4829 6.32937 6.44666 6.29467C6.42953 6.27842 6.41349 6.26085 6.39636 6.24415C7.60698 5.06186 9.11917 4.30874 10.766 4.05813C10.7051 4.1137 10.6456 4.1752 10.5868 4.23911ZM5.87034 6.80839C5.88659 6.82443 5.90416 6.83914 5.92063 6.85496C5.96126 6.89361 6.00278 6.93073 6.04407 6.96873C6.12665 7.0445 6.20989 7.11896 6.29533 7.19144C6.34123 7.23075 6.38801 7.26941 6.4348 7.30762C6.52067 7.37769 6.60765 7.44555 6.69572 7.51232C6.74141 7.54702 6.78687 7.58195 6.83343 7.61577C6.93754 7.69132 7.0434 7.76402 7.15058 7.83474C7.18199 7.85561 7.2123 7.87735 7.24415 7.89778C7.38362 7.98761 7.5255 8.07327 7.6698 8.15497C7.70494 8.17496 7.74096 8.19297 7.7761 8.2123C7.88636 8.2727 7.99749 8.33156 8.11017 8.38735C8.162 8.41304 8.21493 8.43742 8.26764 8.46202C8.3667 8.50858 8.46641 8.55361 8.56722 8.59644C8.62367 8.62016 8.6799 8.64366 8.73656 8.66628C8.77412 8.68122 8.8108 8.69835 8.84858 8.71262C8.83013 8.82376 8.81541 8.93753 8.7985 9.0502C8.7873 9.12532 8.77544 9.19977 8.76512 9.27533C8.73085 9.529 8.7001 9.78554 8.67507 10.0465C8.67419 10.0574 8.67353 10.0689 8.67243 10.0796C8.64893 10.3296 8.63048 10.583 8.61554 10.8389C8.61071 10.9219 8.60764 11.006 8.60368 11.0897C8.59819 11.2028 8.59095 11.3146 8.58743 11.4288H3.98522C4.10536 9.72558 4.76206 8.11434 5.87034 6.80839ZM8.57535 12.1973C8.57579 12.4769 8.58172 12.7546 8.59204 13.0298C8.5949 13.1044 8.60061 13.1776 8.60412 13.252C8.61401 13.4569 8.62477 13.6612 8.64014 13.863C8.64783 13.9654 8.65859 14.0658 8.6676 14.1672C8.68297 14.339 8.69945 14.5103 8.71877 14.6792C8.73151 14.789 8.74645 14.8969 8.76072 15.0054C8.77412 15.1055 8.78488 15.2074 8.7996 15.3063C8.76138 15.3212 8.72448 15.3383 8.68671 15.3539C8.63136 15.3765 8.57623 15.3996 8.52132 15.4231C8.42183 15.4662 8.32343 15.5112 8.22547 15.5577C8.17408 15.5821 8.12247 15.6063 8.07151 15.6315C7.9595 15.6875 7.84924 15.7466 7.73986 15.8075C7.70604 15.8261 7.67156 15.8435 7.63817 15.8626C7.49651 15.9436 7.35726 16.0286 7.22043 16.1174C7.18704 16.1391 7.15432 16.1624 7.12137 16.1848C7.01815 16.2535 6.91623 16.3238 6.81586 16.397C6.76952 16.4306 6.72405 16.4657 6.67837 16.5006C6.59205 16.5661 6.50706 16.6331 6.42316 16.7016C6.37659 16.7396 6.33069 16.778 6.28523 16.8167C6.20111 16.8885 6.11874 16.9623 6.03726 17.0372C5.99685 17.0743 5.95621 17.1106 5.91668 17.1486C5.9013 17.1631 5.88483 17.1769 5.8699 17.1916C4.6808 15.7903 4.01157 14.0379 3.96699 12.1973H8.57535ZM6.39658 17.7558C6.41283 17.7398 6.42865 17.7229 6.44512 17.7069C6.47916 17.6744 6.51408 17.6427 6.54879 17.6107C6.62478 17.5406 6.70165 17.4716 6.78028 17.4046C6.81806 17.3726 6.85583 17.3401 6.89449 17.3084C6.97993 17.2382 7.06712 17.1696 7.15542 17.1029C7.18551 17.08 7.21494 17.0565 7.24503 17.0341C7.36319 16.9472 7.48355 16.8637 7.60611 16.7833C7.63378 16.7653 7.66211 16.7486 7.68979 16.731C7.78643 16.6693 7.88438 16.6094 7.98344 16.552C8.02671 16.5272 8.07019 16.5031 8.11368 16.4789C8.20241 16.4295 8.29224 16.3823 8.38295 16.3363C8.42666 16.3142 8.47015 16.292 8.51429 16.2705C8.62191 16.2186 8.73085 16.1692 8.84067 16.122C8.86615 16.111 8.89119 16.0989 8.9171 16.0884C8.92215 16.086 8.92786 16.0842 8.93292 16.0822C8.93687 16.1024 8.94148 16.1209 8.94565 16.1411C8.97069 16.2676 8.99793 16.3897 9.02516 16.5118C9.04098 16.583 9.05591 16.6564 9.07238 16.7262C9.1084 16.8773 9.14684 17.0227 9.18615 17.1663C9.19626 17.2032 9.20526 17.2423 9.21537 17.2788C9.26566 17.4567 9.31881 17.6285 9.37394 17.7947C9.38998 17.8437 9.40799 17.8889 9.42446 17.9368C9.46465 18.0517 9.50441 18.1659 9.54701 18.2746C9.57008 18.3341 9.59467 18.3897 9.61861 18.4475C9.65639 18.5391 9.69417 18.6304 9.73348 18.7172C9.7605 18.7765 9.78839 18.8321 9.81607 18.8889C9.8545 18.968 9.89316 19.0466 9.93291 19.1213C9.96256 19.1769 9.99287 19.2296 10.0234 19.2825C10.0634 19.3519 10.1033 19.42 10.1444 19.4852C10.1765 19.5355 10.2088 19.5841 10.2413 19.632C10.2828 19.6928 10.325 19.7514 10.3673 19.8079C10.3854 19.8314 10.402 19.8586 10.4203 19.8817C8.90744 19.5832 7.52177 18.8549 6.39658 17.7558ZM13.632 19.8094C13.6753 19.7521 13.7179 19.6928 13.76 19.6309C13.7921 19.5836 13.8242 19.5358 13.8556 19.4861C13.8971 19.4207 13.9375 19.3521 13.9777 19.2821C14.008 19.2294 14.0381 19.1769 14.0677 19.1215C14.1077 19.0469 14.1459 18.9684 14.1846 18.8892C14.2125 18.8323 14.2404 18.7765 14.2674 18.7174C14.3065 18.6311 14.3443 18.5402 14.3818 18.4492C14.406 18.3908 14.4308 18.3348 14.4541 18.2742C14.4956 18.1672 14.5351 18.0545 14.5747 17.9414C14.592 17.8918 14.6102 17.845 14.6272 17.7941C14.6823 17.6282 14.735 17.4569 14.7853 17.2792C14.7961 17.2408 14.8057 17.1995 14.8163 17.1606C14.8549 17.0188 14.8927 16.8758 14.9283 16.7271C14.945 16.6559 14.9603 16.5812 14.9764 16.5088C15.0034 16.3875 15.0304 16.2665 15.0552 16.1413C15.0592 16.1211 15.0638 16.1024 15.0677 16.0822C15.073 16.0844 15.0785 16.0862 15.0838 16.0882C15.1097 16.0991 15.1349 16.1112 15.1609 16.1222C15.2702 16.1692 15.379 16.2184 15.4864 16.2705C15.5305 16.292 15.5742 16.3142 15.6186 16.3366C15.7086 16.3823 15.7982 16.4297 15.8868 16.4787C15.9305 16.5028 15.9742 16.5272 16.0177 16.5522C16.1163 16.6094 16.2138 16.6689 16.3102 16.7306C16.3381 16.7484 16.3671 16.7653 16.3952 16.7835C16.5175 16.8637 16.6377 16.9472 16.7556 17.0339C16.7866 17.0567 16.8165 17.0811 16.8474 17.1044C16.9346 17.1705 17.0209 17.2379 17.1057 17.3076C17.1448 17.3399 17.1835 17.373 17.2221 17.406C17.2992 17.4719 17.375 17.5393 17.4495 17.6082C17.4855 17.6414 17.5217 17.6744 17.5573 17.7082C17.5731 17.7236 17.5883 17.74 17.6043 17.7556C16.4789 18.8547 15.0928 19.5828 13.5808 19.8815C13.5977 19.8593 13.6144 19.8327 13.632 19.8094Z"
      fill="#1B1C1E"
    />
  </svg>
);

export default Universe;
