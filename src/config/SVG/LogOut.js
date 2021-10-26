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
<path d="M12 3H6.0202C4.88889 3 4 3.93304 4 5.03571V19.8795C4 21.067 4.88889 22 6.0202 22H12" stroke="#F18261" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.75977 12.459H21" stroke="#F18261" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.7686 9L20.9986 12.4607L17.7686 15.9214" stroke="#F18261" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(25)} height={getSizeHeight(25)} {...props} />
);