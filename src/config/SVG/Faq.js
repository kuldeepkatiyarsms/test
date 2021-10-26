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
const xml = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8707 18.2321V22.1278C14.8707 22.3009 14.8057 22.4524 14.6759 22.5823C14.546 22.7121 14.3945 22.7771 14.2214 22.7771H10.3257C10.1525 22.7771 10.001 22.7121 9.87117 22.5823C9.74132 22.4524 9.67639 22.3009 9.67639 22.1278V18.2321C9.67639 18.059 9.74132 17.9074 9.87117 17.7776C10.001 17.6477 10.1525 17.5828 10.3257 17.5828H14.2214C14.3945 17.5828 14.546 17.6477 14.6759 17.7776C14.8057 17.9074 14.8707 18.059 14.8707 18.2321ZM20 8.49284C20 9.07719 19.9161 9.62367 19.7484 10.1323C19.5807 10.6409 19.3913 11.0548 19.1803 11.374C18.9693 11.6933 18.6717 12.0152 18.2875 12.3398C17.9034 12.6645 17.5922 12.8998 17.3542 13.0459C17.1161 13.192 16.786 13.3841 16.364 13.6222C15.9203 13.8711 15.5497 14.2228 15.2521 14.6773C14.9545 15.1318 14.8057 15.4943 14.8057 15.7648C14.8057 15.9488 14.7408 16.1246 14.6109 16.2924C14.4811 16.4601 14.3296 16.544 14.1564 16.544H10.2607C10.0984 16.544 9.96045 16.4439 9.84683 16.2437C9.7332 16.0435 9.67639 15.8406 9.67639 15.635V14.9045C9.67639 14.0063 10.0281 13.1596 10.7315 12.3642C11.4349 11.5688 12.2086 10.9818 13.0527 10.603C13.6911 10.3108 14.1456 10.0078 14.4162 9.69401C14.6867 9.38019 14.822 8.96898 14.822 8.46037C14.822 8.00587 14.5704 7.60548 14.0672 7.2592C13.564 6.91291 12.9823 6.73977 12.3222 6.73977C11.6188 6.73977 11.0345 6.89668 10.5692 7.2105C10.1904 7.48104 9.61146 8.10327 8.83232 9.07719C8.69164 9.25033 8.52391 9.33691 8.32913 9.33691C8.19927 9.33691 8.064 9.29362 7.92332 9.20705L5.26126 7.17804C5.12058 7.06982 5.03672 6.93456 5.00966 6.77223C4.98261 6.60991 5.01237 6.45841 5.09894 6.31774C6.83036 3.43925 9.34093 2 12.6306 2C13.4963 2 14.3675 2.16773 15.244 2.50319C16.1205 2.83866 16.9105 3.28775 17.6139 3.85046C18.3173 4.41317 18.8908 5.10303 19.3345 5.92005C19.7782 6.73707 20 7.59466 20 8.49284Z" fill="#F18261"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(25)} height={getSizeHeight(25)} {...props} />
);