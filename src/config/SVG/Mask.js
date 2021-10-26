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
const xml = `<svg width="200" height="280" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<mask id="mask0_201:76" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="280">
<path d="M0 5C0 2.23857 2.23858 0 5 0H199.383V280H5.00001C2.23858 280 0 277.761 0 275V5Z" fill="#C4C4C4"/>
</mask>
<g mask="url(#mask0_201:76)">
<rect width="199.383" height="280" fill="url(#pattern0)"/>
</g>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_201:76" transform="translate(-0.00697812) scale(0.00168993 0.00120337)"/>
</pattern>
</defs>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(200)} height={getSizeHeight(280)}  {...props} />
);