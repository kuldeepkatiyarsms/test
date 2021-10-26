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
const xml = `<svg width="128" height="186" viewBox="0 0 128 186" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 43C0 19.2518 19.2518 0 43 0H129V186H0V43Z" fill="white"/>
<path d="M0 43C0 19.2518 19.2518 0 43 0H129V186H0V43Z" fill="url(#paint0_linear_47:116)" fill-opacity="0.2"/>
<defs>
<linearGradient id="paint0_linear_47:116" x1="20" y1="-7.51989e-08" x2="122" y2="186" gradientUnits="userSpaceOnUse">
<stop stop-color="#F97045"/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(134)} height={getSizeHeight(200)} {...props} />
);