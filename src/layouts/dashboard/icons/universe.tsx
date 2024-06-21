import { ComponentProps } from 'react';

const Universe = (props: ComponentProps<'svg'> & { selectedColor?: string }) => {
  const { selectedColor = '#1B1C1E', ...rest } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M17.8037 8.99989C17.8037 6.7583 16.959 4.62192 15.4251 2.98433C15.4246 2.98411 15.4246 2.98367 15.4242 2.98345C13.7649 1.2121 11.4231 0.196289 8.99989 0.196289C6.57666 0.196289 4.23514 1.2121 2.57603 2.98345C1.04144 4.62148 0.196289 6.75808 0.196289 8.99989C0.196289 11.2419 1.04166 13.3787 2.57603 15.0163C4.23492 16.7875 6.57666 17.8037 9.00011 17.8037C9.00033 17.8037 9.00055 17.8037 9.00077 17.8037C9.00077 17.8037 9.00077 17.8037 9.00099 17.8037C11.424 17.8035 13.7649 16.7877 15.4242 15.0166C15.4246 15.0163 15.4246 15.0159 15.4251 15.0157C16.959 13.3781 17.8037 11.2417 17.8037 8.99989ZM15.1301 14.1916C15.1145 14.1765 15.0978 14.1622 15.0818 14.147C15.0436 14.1106 15.004 14.0754 14.9652 14.0396C14.8828 13.9636 14.7991 13.8887 14.7137 13.816C14.6687 13.7774 14.6232 13.7396 14.5773 13.702C14.4927 13.6329 14.4073 13.5656 14.3203 13.4995C14.2751 13.4653 14.2303 13.4306 14.1844 13.397C14.0835 13.3234 13.9805 13.2527 13.8769 13.1833C13.8444 13.1615 13.8125 13.1387 13.78 13.1174C13.6427 13.0284 13.5028 12.9432 13.3612 12.8622C13.3284 12.8435 13.2948 12.8266 13.2621 12.8083C13.1519 12.7473 13.0405 12.6878 12.9278 12.6311C12.8775 12.6058 12.8261 12.5819 12.7752 12.5577C12.677 12.511 12.5784 12.4657 12.4782 12.4227C12.4235 12.3994 12.3689 12.3761 12.3137 12.3537C12.2757 12.3383 12.2386 12.3212 12.2004 12.306C12.2151 12.2065 12.2259 12.1042 12.2395 12.0036C12.2538 11.8955 12.2689 11.7879 12.2812 11.6785C12.301 11.5103 12.3168 11.3399 12.3322 11.1692C12.3416 11.0666 12.3524 10.965 12.3601 10.8615C12.3752 10.6636 12.3858 10.4631 12.3957 10.2621C12.3994 10.1839 12.4051 10.1066 12.4082 10.028C12.4187 9.75345 12.4244 9.4765 12.4249 9.19756H17.0326C16.9878 11.0379 16.319 12.7903 15.1301 14.1916ZM11.2722 13.1284C11.2555 13.2087 11.2388 13.2887 11.2208 13.3675C11.2046 13.4409 11.1872 13.5129 11.1699 13.5845C11.1514 13.6612 11.1325 13.737 11.1128 13.8116C11.0948 13.8815 11.0759 13.9504 11.057 14.0185C11.0366 14.0912 11.0159 14.1631 10.9948 14.2336C10.9751 14.2999 10.9549 14.3651 10.9346 14.4292C10.9125 14.498 10.8903 14.5659 10.8677 14.6324C10.8464 14.6943 10.8253 14.7556 10.8035 14.8156C10.78 14.8804 10.7561 14.9434 10.7319 15.0058C10.7095 15.0636 10.6873 15.1204 10.6641 15.176C10.6392 15.2362 10.6138 15.2946 10.5885 15.3524C10.5652 15.4053 10.5417 15.458 10.5178 15.509C10.4916 15.5648 10.4651 15.6181 10.4383 15.6711C10.4141 15.7192 10.3895 15.7673 10.3649 15.8132C10.3375 15.8639 10.3096 15.912 10.2815 15.9601C10.2566 16.0029 10.2316 16.0464 10.2063 16.0868C10.1776 16.133 10.1484 16.1756 10.1194 16.2186C10.0941 16.2559 10.0688 16.2942 10.0429 16.3291C10.0128 16.3699 9.98253 16.4068 9.95222 16.4444C9.92675 16.476 9.90105 16.509 9.87513 16.5382C9.84372 16.5735 9.81232 16.6045 9.78069 16.6359C9.75499 16.6618 9.72973 16.6893 9.70382 16.7128C9.67131 16.7422 9.63815 16.7668 9.6052 16.7923C9.58038 16.8121 9.55512 16.8336 9.52987 16.8509C9.49494 16.8747 9.46024 16.8929 9.42488 16.912C9.40138 16.9252 9.37766 16.9408 9.35416 16.9517C9.31506 16.9698 9.27575 16.9814 9.23643 16.9933C9.21689 16.9994 9.19712 17.0089 9.17735 17.0135C9.11805 17.0273 9.05897 17.0348 9.00011 17.0348C8.94103 17.0348 8.88173 17.0273 8.82242 17.0135C8.80288 17.0089 8.78333 16.9996 8.76356 16.9935C8.72403 16.9812 8.68493 16.9698 8.64562 16.9517C8.62212 16.941 8.59884 16.9254 8.57578 16.9127C8.54019 16.8931 8.50505 16.8749 8.46991 16.8509C8.44531 16.8342 8.42093 16.8127 8.39633 16.7938C8.36273 16.7677 8.32913 16.7427 8.29596 16.7123C8.27092 16.6895 8.24588 16.6629 8.22107 16.6379C8.189 16.6056 8.15649 16.5738 8.12465 16.5377C8.09939 16.5092 8.07457 16.4773 8.04975 16.4466C8.01856 16.4082 7.98738 16.3702 7.95685 16.3284C7.93181 16.2946 7.90699 16.2575 7.88261 16.2215C7.85252 16.1773 7.82265 16.1334 7.793 16.0859C7.76862 16.0466 7.74446 16.0049 7.7203 15.9634C7.69131 15.9138 7.66254 15.8641 7.6342 15.8116C7.61048 15.7675 7.58698 15.7209 7.56348 15.6746C7.53603 15.6199 7.50835 15.5648 7.48134 15.507C7.4585 15.458 7.43565 15.4071 7.41281 15.3559C7.38668 15.2964 7.36054 15.2357 7.33484 15.1734C7.31244 15.1198 7.29113 15.0644 7.26917 15.0089C7.24457 14.9447 7.21975 14.8797 7.19581 14.8132C7.17473 14.7547 7.15386 14.6952 7.13322 14.6348C7.11016 14.5663 7.08709 14.4969 7.06447 14.4262C7.0447 14.3638 7.02494 14.3005 7.00561 14.2364C6.98409 14.1639 6.963 14.0904 6.94214 14.0157C6.92369 13.9489 6.90524 13.8817 6.88723 13.8132C6.86746 13.737 6.84813 13.6597 6.82924 13.5817C6.81233 13.5114 6.79542 13.4405 6.77895 13.3686C6.76094 13.2889 6.74381 13.2079 6.72689 13.1262C6.71152 13.0519 6.69593 12.9777 6.68143 12.9019C6.67616 12.8745 6.67133 12.8461 6.66628 12.8184C6.66803 12.8178 6.66979 12.8171 6.67133 12.8167C6.83605 12.7666 7.00275 12.7242 7.1699 12.6851C7.20701 12.6766 7.24369 12.6673 7.28103 12.6594C7.43851 12.625 7.59687 12.5962 7.75588 12.5714C7.80047 12.5646 7.84505 12.5577 7.88964 12.5518C8.04777 12.5296 8.20613 12.5118 8.36537 12.4993C8.40666 12.496 8.44773 12.4945 8.48902 12.4916C8.64254 12.482 8.79607 12.476 8.94981 12.4749C8.9832 12.4747 9.01658 12.4747 9.04997 12.4749C9.20393 12.4758 9.35767 12.482 9.51164 12.4919C9.55249 12.4945 9.59334 12.4962 9.63397 12.4993C9.79343 12.5121 9.95244 12.5301 10.1108 12.5518C10.1549 12.558 10.1991 12.5643 10.2432 12.5711C10.4029 12.596 10.5617 12.6252 10.7198 12.6594C10.7561 12.6673 10.7921 12.6763 10.8281 12.6849C10.9964 12.724 11.1631 12.7666 11.3285 12.8167C11.33 12.8174 11.3317 12.8178 11.3331 12.8184C11.328 12.8459 11.3232 12.8742 11.3179 12.9017C11.3034 12.9788 11.288 13.0537 11.2722 13.1284ZM6.78707 4.92545C6.80486 4.84748 6.82243 4.76973 6.84088 4.69374C6.85758 4.62631 6.87471 4.56086 6.89184 4.49519C6.91095 4.42161 6.93028 4.34826 6.95026 4.27665C6.96827 4.21252 6.98672 4.14993 7.00539 4.08755C7.02626 4.01793 7.0469 3.94896 7.06865 3.88153C7.08775 3.82091 7.10752 3.76139 7.12751 3.70275C7.14947 3.63752 7.17165 3.57317 7.1945 3.51013C7.21514 3.45303 7.23601 3.39702 7.25709 3.34167C7.28037 3.28083 7.30409 3.22109 7.32781 3.16267C7.34978 3.10974 7.37152 3.05746 7.3937 3.00629C7.41808 2.94984 7.44334 2.89494 7.46816 2.84091C7.491 2.79215 7.51362 2.74405 7.53647 2.69748C7.56216 2.64543 7.5883 2.59513 7.61466 2.54572C7.63794 2.50157 7.66144 2.45786 7.68516 2.41569C7.71173 2.36825 7.73919 2.32323 7.76642 2.27864C7.79014 2.23933 7.8143 2.20001 7.83868 2.16267C7.86658 2.12029 7.89491 2.08053 7.92324 2.04078C7.94762 2.00651 7.972 1.97159 7.9966 1.93953C8.02581 1.90175 8.05502 1.86771 8.08423 1.83322C8.10883 1.80401 8.13343 1.77414 8.15825 1.74735C8.18856 1.71484 8.21909 1.68629 8.24962 1.65708C8.274 1.63358 8.2986 1.60854 8.32298 1.58745C8.35482 1.56022 8.38645 1.53738 8.41852 1.51387C8.44224 1.49608 8.4664 1.47632 8.49034 1.46072C8.52372 1.43898 8.55777 1.42251 8.59115 1.40494C8.61399 1.39286 8.63661 1.37858 8.65946 1.3687C8.69723 1.35244 8.73479 1.3419 8.77235 1.3307C8.79168 1.32521 8.81056 1.31664 8.82989 1.31225C8.88656 1.29973 8.94366 1.29292 9.00033 1.29292C9.05699 1.29292 9.11432 1.29973 9.17076 1.31225C9.18987 1.31664 9.20876 1.32521 9.22787 1.3307C9.26565 1.34168 9.30342 1.35222 9.3412 1.3687C9.3636 1.37858 9.38601 1.39264 9.40863 1.40428C9.44245 1.42207 9.4765 1.43876 9.51032 1.46094C9.53404 1.47632 9.55754 1.49565 9.58126 1.51322C9.61333 1.53694 9.64583 1.56 9.67746 1.58767C9.70184 1.60854 9.726 1.63314 9.74994 1.65642C9.78091 1.68585 9.81166 1.71484 9.84219 1.74779C9.86679 1.77414 9.89116 1.80379 9.91533 1.83234C9.9452 1.86727 9.97485 1.90197 10.0038 1.94019C10.0282 1.97181 10.0524 2.0063 10.0765 2.0399C10.1051 2.08009 10.1339 2.12029 10.162 2.16333C10.1859 2.20001 10.2099 2.23911 10.2334 2.27776C10.261 2.32301 10.2887 2.36847 10.3157 2.41657C10.339 2.45786 10.3621 2.50135 10.3851 2.54484C10.4117 2.59491 10.4381 2.64565 10.464 2.69836C10.4868 2.74449 10.5092 2.79215 10.5316 2.84025C10.5571 2.89472 10.5819 2.95028 10.607 3.00761C10.6289 3.0579 10.6507 3.10974 10.6722 3.16223C10.6961 3.22153 10.7203 3.28171 10.7438 3.34321C10.7644 3.39768 10.7851 3.45303 10.8055 3.50947C10.8283 3.57317 10.851 3.63818 10.8734 3.70407C10.8931 3.76271 10.9125 3.82157 10.9318 3.88197C10.9533 3.94962 10.9742 4.0188 10.995 4.08843C11.0137 4.15058 11.0319 4.21296 11.0497 4.27687C11.0699 4.34891 11.0897 4.42271 11.109 4.49695C11.1257 4.56196 11.1429 4.62719 11.1593 4.69374C11.1782 4.77017 11.1958 4.84836 11.2138 4.92677C11.2292 4.99486 11.2448 5.06251 11.2595 5.13213C11.2641 5.15453 11.2683 5.17759 11.2731 5.2C11.2696 5.20088 11.2663 5.20175 11.2628 5.20285C11.1033 5.24963 10.9421 5.28983 10.7802 5.32651C10.7464 5.33397 10.7124 5.34232 10.6786 5.34957C10.5242 5.38229 10.3689 5.40975 10.2131 5.43369C10.1699 5.44006 10.1264 5.44643 10.0829 5.45236C9.92872 5.47322 9.77432 5.49013 9.61948 5.50221C9.57863 5.50529 9.53799 5.50705 9.49714 5.50946C9.34823 5.51869 9.1991 5.5244 9.04975 5.5255C9.01724 5.52571 8.98429 5.52571 8.95157 5.5255C8.80222 5.5244 8.65309 5.51869 8.50374 5.50946C8.4631 5.50705 8.42269 5.50507 8.38228 5.50221C8.227 5.49013 8.07259 5.47322 7.91841 5.45236C7.87492 5.44665 7.83143 5.44028 7.78817 5.43369C7.63245 5.41019 7.47716 5.38273 7.32298 5.34957C7.28894 5.34254 7.2549 5.33419 7.22085 5.32651C7.05854 5.28961 6.89711 5.24941 6.73722 5.20263C6.73414 5.20153 6.73129 5.20088 6.72821 5.2C6.73282 5.17759 6.73678 5.15453 6.74161 5.13213C6.75589 5.06163 6.77126 4.99354 6.78707 4.92545ZM10.9362 11.9219C10.8951 11.9125 10.8543 11.9026 10.8132 11.8938C10.6614 11.8619 10.5083 11.8354 10.3553 11.8119C10.2876 11.8013 10.2202 11.791 10.1521 11.782C10.0052 11.7627 9.858 11.7469 9.71041 11.7348C9.63485 11.7288 9.55908 11.7249 9.48352 11.7207C9.37371 11.715 9.26389 11.7111 9.15407 11.7091C9.10268 11.7082 9.05128 11.7038 8.99967 11.7038C8.94828 11.7038 8.89666 11.7084 8.84527 11.7091C8.73545 11.7111 8.62607 11.7148 8.51625 11.7207C8.4407 11.7251 8.36515 11.7288 8.28981 11.7348C8.14178 11.7469 7.9944 11.7627 7.84747 11.782C7.7796 11.791 7.71217 11.8011 7.64453 11.8119C7.49056 11.8356 7.3366 11.8622 7.18351 11.8942C7.14376 11.9028 7.10445 11.9127 7.06447 11.9215C6.91183 11.9557 6.75984 11.9944 6.60895 12.037C6.58743 12.0429 6.56568 12.0471 6.54416 12.0532C6.53428 11.9838 6.52307 11.9153 6.51407 11.8453C6.50133 11.7471 6.48925 11.6485 6.47805 11.549C6.4596 11.3875 6.44379 11.2243 6.42907 11.0603C6.4205 10.9641 6.4115 10.8685 6.40425 10.7719C6.39041 10.5874 6.38031 10.4009 6.37153 10.2136C6.36779 10.1361 6.3623 10.0596 6.35967 9.98166C6.35 9.72227 6.34495 9.46068 6.34451 9.19712H11.6555C11.655 9.46068 11.65 9.72249 11.6403 9.98166C11.6375 10.0592 11.6322 10.1352 11.6285 10.2123C11.6195 10.3998 11.6091 10.5865 11.5955 10.7712C11.5883 10.8683 11.5793 10.9643 11.5707 11.0605C11.5562 11.2241 11.5402 11.3869 11.5219 11.5481C11.5105 11.6478 11.4984 11.7469 11.4855 11.8455C11.4765 11.9153 11.4655 11.9838 11.4556 12.053C11.4337 12.0469 11.4115 12.0425 11.3897 12.0363C11.2395 11.9944 11.0886 11.9559 10.9362 11.9219ZM7.17034 6.10335C7.17495 6.10445 7.17956 6.10577 7.18417 6.10665C7.37262 6.14662 7.56282 6.17869 7.75368 6.20592C7.77038 6.20856 7.78707 6.21097 7.80376 6.21317C7.9955 6.23953 8.18834 6.25951 8.38184 6.27313C8.38909 6.27357 8.39633 6.27401 8.40358 6.27445C8.60191 6.28806 8.80068 6.29641 9.00011 6.29641C9.19954 6.29641 9.39831 6.28806 9.59642 6.27445C9.6041 6.27401 9.61179 6.27357 9.61948 6.27291C9.81254 6.25929 10.0045 6.23953 10.1956 6.21339C10.2131 6.21097 10.2307 6.20834 10.2483 6.2057C10.4383 6.17847 10.6276 6.1464 10.8154 6.10687C10.8209 6.10577 10.8264 6.10423 10.8316 6.10291C11.0084 6.06536 11.1839 6.02121 11.3579 5.97267C11.3746 5.96806 11.3917 5.96498 11.4084 5.95993C11.4209 6.03768 11.4345 6.1139 11.4457 6.19252C11.4565 6.26478 11.4673 6.33704 11.4767 6.40996C11.5053 6.62257 11.5305 6.83737 11.5523 7.05525C11.5553 7.08468 11.5591 7.11367 11.5617 7.1431C11.5852 7.39063 11.6032 7.64189 11.6179 7.89579C11.6221 7.96453 11.6247 8.0346 11.628 8.104C11.6331 8.21118 11.6357 8.3199 11.6395 8.4284H6.36076C6.36428 8.31968 6.36669 8.2103 6.37197 8.10246C6.37548 8.03328 6.3779 7.96322 6.38207 7.89447C6.39656 7.64145 6.41479 7.39041 6.43808 7.14354C6.44137 7.11103 6.44554 7.07919 6.44884 7.04668C6.47036 6.83166 6.49518 6.61971 6.52307 6.40996C6.53296 6.33704 6.54372 6.26456 6.55404 6.19231C6.56568 6.11412 6.5793 6.0379 6.59182 5.96015C6.60851 5.96498 6.62608 5.96828 6.64277 5.97311C6.8176 6.02143 6.99309 6.0658 7.17034 6.10335ZM12.4126 8.42862C12.4084 8.30277 12.4007 8.17912 12.3948 8.05458C12.3908 7.97354 12.388 7.89183 12.3831 7.81123C12.3675 7.54899 12.3484 7.28872 12.3236 7.03241C12.3214 7.00825 12.3181 6.98453 12.3155 6.96059C12.2924 6.72777 12.265 6.49826 12.2342 6.27093C12.2232 6.18967 12.2105 6.10994 12.1984 6.02912C12.183 5.92369 12.1688 5.81651 12.1516 5.71262C12.1899 5.69791 12.2272 5.68078 12.2654 5.66562C12.3212 5.643 12.3765 5.62016 12.4319 5.59666C12.5336 5.55361 12.6344 5.50836 12.7343 5.46136C12.7862 5.43698 12.8382 5.41282 12.8896 5.38756C13.0034 5.33134 13.115 5.27226 13.2259 5.2112C13.2606 5.19209 13.2959 5.17452 13.3306 5.15497C13.4747 5.07327 13.617 4.98739 13.7565 4.89756C13.7879 4.87735 13.8182 4.85561 13.8496 4.83497C13.9568 4.7638 14.0633 4.6911 14.1674 4.61533C14.2138 4.58195 14.2588 4.54702 14.3043 4.51254C14.3928 4.44555 14.4802 4.37747 14.5661 4.30718C14.6126 4.26919 14.659 4.23053 14.7049 4.19166C14.7908 4.11874 14.8747 4.04362 14.9577 3.96741C14.9983 3.93029 15.0392 3.89361 15.0789 3.85562C15.0956 3.8398 15.1136 3.82465 15.1301 3.80839C16.2382 5.11434 16.8944 6.72558 17.0148 8.42862H12.4126ZM14.6036 3.24393C14.5865 3.26085 14.5703 3.27842 14.5527 3.29511C14.5171 3.32915 14.4802 3.36254 14.4442 3.39592C14.3678 3.46598 14.2907 3.53473 14.212 3.60194C14.1729 3.6351 14.1338 3.66849 14.0941 3.70099C14.008 3.7715 13.9204 3.84002 13.8316 3.90701C13.8002 3.93051 13.7695 3.95533 13.7376 3.97839C13.617 4.06646 13.4943 4.15168 13.3691 4.23295C13.3438 4.2492 13.3181 4.26414 13.2926 4.28017C13.1912 4.3443 13.0884 4.40668 12.9847 4.46642C12.9414 4.49102 12.8977 4.51474 12.8543 4.53846C12.7638 4.58832 12.672 4.6362 12.5795 4.68232C12.5347 4.70494 12.4897 4.72734 12.4442 4.74909C12.3403 4.79873 12.2351 4.84529 12.1288 4.89053C12.0967 4.90437 12.0649 4.91908 12.0326 4.93204C12.0236 4.93578 12.0146 4.93863 12.0056 4.94215C12.001 4.9193 11.9955 4.89778 11.9906 4.87516C11.9832 4.84024 11.9753 4.80619 11.9676 4.77171C11.9353 4.62741 11.9015 4.48575 11.8663 4.34782C11.8617 4.33003 11.8576 4.31158 11.8529 4.29401C11.8141 4.14509 11.7737 4.00101 11.7315 3.85979C11.7216 3.82662 11.7117 3.79368 11.7016 3.76095C11.659 3.62127 11.6151 3.48443 11.5692 3.35331C11.5648 3.34101 11.5604 3.32959 11.556 3.31751C11.5129 3.19474 11.4681 3.07657 11.4225 2.96148C11.4117 2.93425 11.4009 2.9068 11.3899 2.88022C11.341 2.76074 11.2911 2.64499 11.2393 2.53386C11.2294 2.51233 11.2191 2.49191 11.209 2.4706C11.162 2.37155 11.1134 2.27557 11.0645 2.18354C11.0552 2.16619 11.0462 2.14818 11.0368 2.13105C10.9816 2.03045 10.9252 1.93469 10.8677 1.84311C10.8543 1.82202 10.8411 1.80182 10.8277 1.78139C10.7699 1.69222 10.7115 1.6059 10.6513 1.52574C10.6491 1.5231 10.6474 1.52024 10.6454 1.51761C10.5841 1.4359 10.5209 1.36057 10.4572 1.28831C10.4427 1.27206 10.428 1.2558 10.4135 1.23977C10.3544 1.17542 10.2946 1.11392 10.2338 1.05791C11.8806 1.30874 13.3928 2.06186 14.6036 3.24393ZM7.58676 1.23911C7.57183 1.25537 7.55667 1.27206 7.54218 1.28919C7.47848 1.36101 7.41567 1.4359 7.35439 1.51739C7.35197 1.52068 7.34978 1.5242 7.34714 1.52749C7.28784 1.60678 7.22986 1.69222 7.17253 1.78051C7.1587 1.8016 7.14508 1.82224 7.13168 1.84399C7.07436 1.93513 7.01813 2.03024 6.96344 2.13039C6.95356 2.14818 6.94411 2.16685 6.93467 2.18508C6.88569 2.27645 6.83781 2.37155 6.79103 2.46994C6.7807 2.49147 6.77038 2.51233 6.76006 2.5343C6.70866 2.64521 6.65881 2.76052 6.60983 2.87956C6.59863 2.9068 6.58787 2.93469 6.57688 2.96236C6.53142 3.07679 6.48705 3.1943 6.44401 3.31597C6.43961 3.32893 6.435 3.34079 6.43039 3.35375C6.3847 3.48487 6.341 3.62149 6.29817 3.76073C6.28807 3.79368 6.27818 3.82684 6.26808 3.86023C6.22635 4.00123 6.1855 4.14509 6.14684 4.29379C6.14223 4.31202 6.13784 4.3309 6.133 4.34913C6.09786 4.48663 6.06426 4.62807 6.03219 4.77193C6.0245 4.80619 6.01638 4.84046 6.00891 4.87538C6.00408 4.898 5.99881 4.91952 5.99397 4.94237C5.98519 4.93885 5.97618 4.936 5.96718 4.93226C5.93489 4.91908 5.90305 4.90437 5.87098 4.89075C5.7649 4.84573 5.65969 4.79894 5.5558 4.74931C5.51034 4.72756 5.46531 4.70516 5.42029 4.68254C5.32782 4.63642 5.23624 4.58832 5.14575 4.53868C5.10204 4.51496 5.05855 4.49124 5.01528 4.46664C4.9114 4.40712 4.80905 4.34474 4.70758 4.28039C4.6821 4.26436 4.6564 4.24942 4.63092 4.23295C4.50573 4.1519 4.38296 4.06668 4.26238 3.97883C4.23053 3.95555 4.19978 3.93051 4.16794 3.90679C4.07942 3.84002 3.99201 3.77193 3.90635 3.70143C3.86616 3.66871 3.82706 3.6351 3.78753 3.60172C3.70956 3.53495 3.63269 3.46686 3.55713 3.39724C3.52023 3.3632 3.4829 3.32937 3.44666 3.29467C3.42953 3.27842 3.41349 3.26085 3.39636 3.24415C4.60698 2.06186 6.11917 1.30874 7.76598 1.05813C7.70515 1.1137 7.64562 1.1752 7.58676 1.23911ZM2.87034 3.80839C2.88659 3.82443 2.90416 3.83914 2.92063 3.85496C2.96126 3.89361 3.00278 3.93073 3.04407 3.96873C3.12665 4.0445 3.20989 4.11896 3.29533 4.19144C3.34123 4.23075 3.38801 4.26941 3.4348 4.30762C3.52067 4.37769 3.60765 4.44555 3.69572 4.51232C3.74141 4.54702 3.78687 4.58195 3.83343 4.61577C3.93754 4.69132 4.0434 4.76402 4.15058 4.83474C4.18199 4.85561 4.2123 4.87735 4.24415 4.89778C4.38362 4.98761 4.5255 5.07327 4.6698 5.15497C4.70494 5.17496 4.74096 5.19297 4.7761 5.2123C4.88636 5.2727 4.99749 5.33156 5.11017 5.38735C5.162 5.41304 5.21493 5.43742 5.26764 5.46202C5.3667 5.50858 5.46641 5.55361 5.56722 5.59644C5.62367 5.62016 5.6799 5.64366 5.73656 5.66628C5.77412 5.68122 5.8108 5.69835 5.84858 5.71262C5.83013 5.82376 5.81541 5.93753 5.7985 6.0502C5.7873 6.12532 5.77544 6.19977 5.76512 6.27533C5.73085 6.529 5.7001 6.78554 5.67507 7.04646C5.67419 7.05744 5.67353 7.06886 5.67243 7.07963C5.64893 7.32957 5.63048 7.58303 5.61554 7.8389C5.61071 7.92192 5.60764 8.00604 5.60368 8.08973C5.59819 8.20284 5.59095 8.31463 5.58743 8.42884H0.985215C1.10536 6.72558 1.76206 5.11434 2.87034 3.80839ZM5.57535 9.19734C5.57579 9.47694 5.58172 9.75455 5.59204 10.0298C5.5949 10.1044 5.60061 10.1776 5.60412 10.252C5.61401 10.4569 5.62477 10.6612 5.64014 10.863C5.64783 10.9654 5.65859 11.0658 5.6676 11.1672C5.68297 11.339 5.69945 11.5103 5.71877 11.6792C5.73151 11.789 5.74645 11.8969 5.76072 12.0054C5.77412 12.1055 5.78488 12.2074 5.7996 12.3063C5.76138 12.3212 5.72448 12.3383 5.68671 12.3539C5.63136 12.3765 5.57623 12.3996 5.52132 12.4231C5.42183 12.4662 5.32343 12.5112 5.22547 12.5577C5.17408 12.5821 5.12247 12.6063 5.07151 12.6315C4.9595 12.6875 4.84924 12.7466 4.73986 12.8075C4.70604 12.8261 4.67156 12.8435 4.63817 12.8626C4.49651 12.9436 4.35726 13.0286 4.22043 13.1174C4.18704 13.1391 4.15432 13.1624 4.12137 13.1848C4.01815 13.2535 3.91623 13.3238 3.81586 13.397C3.76952 13.4306 3.72405 13.4657 3.67837 13.5006C3.59205 13.5661 3.50706 13.6331 3.42316 13.7016C3.37659 13.7396 3.33069 13.778 3.28523 13.8167C3.20111 13.8885 3.11874 13.9623 3.03726 14.0372C2.99685 14.0743 2.95621 14.1106 2.91668 14.1486C2.9013 14.1631 2.88483 14.1769 2.8699 14.1916C1.6808 12.7903 1.01157 11.0379 0.966986 9.19734H5.57535ZM3.39658 14.7558C3.41283 14.7398 3.42865 14.7229 3.44512 14.7069C3.47916 14.6744 3.51408 14.6427 3.54879 14.6107C3.62478 14.5406 3.70165 14.4716 3.78028 14.4046C3.81806 14.3726 3.85583 14.3401 3.89449 14.3084C3.97993 14.2382 4.06712 14.1696 4.15542 14.1029C4.18551 14.08 4.21494 14.0565 4.24503 14.0341C4.36319 13.9472 4.48355 13.8637 4.60611 13.7833C4.63378 13.7653 4.66211 13.7486 4.68979 13.731C4.78643 13.6693 4.88438 13.6094 4.98344 13.552C5.02671 13.5272 5.07019 13.5031 5.11368 13.4789C5.20241 13.4295 5.29224 13.3823 5.38295 13.3363C5.42666 13.3142 5.47015 13.292 5.51429 13.2705C5.62191 13.2186 5.73085 13.1692 5.84067 13.122C5.86615 13.111 5.89119 13.0989 5.9171 13.0884C5.92215 13.086 5.92786 13.0842 5.93292 13.0822C5.93687 13.1024 5.94148 13.1209 5.94565 13.1411C5.97069 13.2676 5.99793 13.3897 6.02516 13.5118C6.04098 13.583 6.05591 13.6564 6.07238 13.7262C6.1084 13.8773 6.14684 14.0227 6.18615 14.1663C6.19626 14.2032 6.20526 14.2423 6.21537 14.2788C6.26566 14.4567 6.31881 14.6285 6.37394 14.7947C6.38998 14.8437 6.40799 14.8889 6.42446 14.9368C6.46465 15.0517 6.50441 15.1659 6.54701 15.2746C6.57008 15.3341 6.59467 15.3897 6.61861 15.4475C6.65639 15.5391 6.69417 15.6304 6.73348 15.7172C6.7605 15.7765 6.78839 15.8321 6.81607 15.8889C6.8545 15.968 6.89316 16.0466 6.93291 16.1213C6.96256 16.1769 6.99287 16.2296 7.0234 16.2825C7.06337 16.3519 7.10335 16.42 7.14442 16.4852C7.17649 16.5355 7.20877 16.5841 7.24128 16.632C7.28279 16.6928 7.32496 16.7514 7.36735 16.8079C7.38536 16.8314 7.40205 16.8586 7.42028 16.8817C5.90744 16.5832 4.52177 15.8549 3.39658 14.7558ZM10.632 16.8094C10.6753 16.7521 10.7179 16.6928 10.76 16.6309C10.7921 16.5836 10.8242 16.5358 10.8556 16.4861C10.8971 16.4207 10.9375 16.3521 10.9777 16.2821C11.008 16.2294 11.0381 16.1769 11.0677 16.1215C11.1077 16.0469 11.1459 15.9684 11.1846 15.8892C11.2125 15.8323 11.2404 15.7765 11.2674 15.7174C11.3065 15.6311 11.3443 15.5402 11.3818 15.4492C11.406 15.3908 11.4308 15.3348 11.4541 15.2742C11.4956 15.1672 11.5351 15.0545 11.5747 14.9414C11.592 14.8918 11.6102 14.845 11.6272 14.7941C11.6823 14.6282 11.735 14.4569 11.7853 14.2792C11.7961 14.2408 11.8057 14.1995 11.8163 14.1606C11.8549 14.0188 11.8927 13.8758 11.9283 13.7271C11.945 13.6559 11.9603 13.5812 11.9764 13.5088C12.0034 13.3875 12.0304 13.2665 12.0552 13.1413C12.0592 13.1211 12.0638 13.1024 12.0677 13.0822C12.073 13.0844 12.0785 13.0862 12.0838 13.0882C12.1097 13.0991 12.1349 13.1112 12.1609 13.1222C12.2702 13.1692 12.379 13.2184 12.4864 13.2705C12.5305 13.292 12.5742 13.3142 12.6186 13.3366C12.7086 13.3823 12.7982 13.4297 12.8868 13.4787C12.9305 13.5028 12.9742 13.5272 13.0177 13.5522C13.1163 13.6094 13.2138 13.6689 13.3102 13.7306C13.3381 13.7484 13.3671 13.7653 13.3952 13.7835C13.5175 13.8637 13.6377 13.9472 13.7556 14.0339C13.7866 14.0567 13.8165 14.0811 13.8474 14.1044C13.9346 14.1705 14.0209 14.2379 14.1057 14.3076C14.1448 14.3399 14.1835 14.373 14.2221 14.406C14.2992 14.4719 14.375 14.5393 14.4495 14.6082C14.4855 14.6414 14.5217 14.6744 14.5573 14.7082C14.5731 14.7236 14.5883 14.74 14.6043 14.7556C13.4789 15.8547 12.0928 16.5828 10.5808 16.8815C10.5977 16.8593 10.6144 16.8327 10.632 16.8094Z"
        fill={selectedColor}
      />
    </svg>
  );
};

export default Universe;
