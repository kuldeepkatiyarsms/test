import React from 'react';
import {SvgXml} from 'react-native-svg';
import {
  img_url, api_url,
  font_title,
  font_description,
  home_details,
  Lato_Regular,
  Lato_Bold,
  Roboto,
  getSizeHeight,
  getSizeWidth,
  getFontRatio,
  screenWidth
} from '../Constants';
const xml = `<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9664 18.3702C17.9664 15.3754 15.7471 12.8996 12.8628 12.4979C12.8525 12.4962 12.8423 12.4959 12.832 12.4938C12.7494 12.4832 12.6663 12.4738 12.5822 12.4659C12.5822 12.4741 12.5799 12.4827 12.5799 12.4906C12.5778 12.5156 12.5737 12.5394 12.5713 12.5641C12.5558 12.703 12.5143 12.8376 12.4497 12.9678C12.0145 14.0644 10.6041 16.1426 9.77435 17.323L9.60334 14.8709C9.84575 14.7472 10.0541 14.541 10.1875 14.3021C10.2836 14.1308 10.3423 13.9433 10.3423 13.752C10.3423 13.752 9.72352 14.0262 9.09119 14.0262C9.05505 14.0262 9.0192 14.0262 8.98306 14.0241C8.94692 14.0262 8.91078 14.0262 8.87464 14.0262C8.2426 14.0262 7.62379 13.752 7.62379 13.752C7.62379 13.9433 7.68256 14.1308 7.77864 14.3021C7.91204 14.541 8.12095 14.7466 8.36278 14.8709L8.19177 17.323C7.36228 16.1426 5.95217 14.0644 5.51642 12.9678C5.45148 12.8376 5.41034 12.703 5.39477 12.5641C5.39183 12.5391 5.38772 12.5153 5.38625 12.4906C5.38625 12.4824 5.38331 12.4738 5.38331 12.4659C5.29986 12.4738 5.21671 12.4832 5.13414 12.4938C5.12386 12.4959 5.11299 12.4962 5.10329 12.4979C2.21932 12.8993 0 15.3752 0 18.3702C0 21.6447 2.65478 21.637 5.92955 21.637H8.98335H12.0372C15.3113 21.637 17.9664 21.6444 17.9664 18.3702Z" fill="#F18261"/>
<path d="M4.2276 9.27337C4.35159 9.30657 4.48147 9.32508 4.61693 9.32508H4.88373C4.90576 9.32508 4.92633 9.32214 4.94837 9.32097C5.65856 11.5391 7.19619 13.0794 8.98358 13.0794C10.5973 13.0794 12.0071 11.8232 12.789 9.94712C13.0543 9.75848 13.2838 9.54869 13.4601 9.31803C13.5462 9.31156 13.6308 9.29981 13.7113 9.27983C14.3213 9.12909 14.7715 8.60989 14.7715 7.98932V6.94121C14.7715 6.32123 14.3213 5.80114 13.7113 5.65041V4.45627C13.7116 1.99895 11.5849 0 8.96947 0C6.35465 0 4.2276 1.99895 4.2276 4.45598V5.65716C3.63229 5.81642 3.19507 6.33063 3.19507 6.94092V7.98902C3.19507 8.60049 3.63229 9.11411 4.2276 9.27337ZM8.96947 0.930275C10.8324 0.930275 12.3785 2.21374 12.6691 3.88712C11.8605 2.65772 10.5118 1.85173 8.98358 1.85173C7.43214 1.85173 6.06582 2.68181 5.2616 3.94236C5.52781 2.24136 7.08718 0.930275 8.96947 0.930275ZM5.21752 7.48069C5.36826 7.52976 5.54103 7.60851 5.72732 7.73838C5.72732 7.73838 5.28451 5.11005 6.21949 4.74158C6.21949 4.74158 7.50942 5.36774 8.98358 5.40829C10.458 5.36774 11.7477 4.74158 11.7477 4.74158C12.6826 5.11005 12.2392 7.73838 12.2392 7.73838C12.4144 7.61644 12.5777 7.53828 12.7226 7.48892V8.35573C12.6424 8.73918 12.5363 9.10529 12.4053 9.44967C11.8047 9.86603 10.949 10.1613 9.98525 10.2433C9.87507 10.0732 9.68437 9.96035 9.46605 9.96035H8.64332C8.30041 9.96035 8.02362 10.2371 8.02362 10.5795C8.02362 10.9215 8.30071 11.1986 8.64332 11.1986H9.46605C9.70494 11.1986 9.90974 11.0625 10.012 10.8645C10.7275 10.8086 11.3798 10.6476 11.9422 10.4117C11.2249 11.6231 10.1668 12.3939 8.98358 12.3939C7.1862 12.3939 5.67649 10.6229 5.21752 8.21234V7.48069Z" fill="#F18261"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(18)} height={getSizeHeight(22)} {...props} />
);