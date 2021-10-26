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
const xml = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2865 0.0895586L0.72956 4.96199C-0.488461 5.53054 -0.082397 7.31746 1.21687 7.31746H5.68375V11.7835C5.68375 13.0828 7.47032 13.489 8.03922 12.2708L12.9108 1.71381C13.3169 0.739022 12.261 -0.317359 11.2865 0.0895586Z" fill="#F18261"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(16)} height={getSizeHeight(16)} {...props} />
);