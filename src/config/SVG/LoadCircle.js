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
const xml = `<svg width="91" height="89" viewBox="0 0 91 89" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="43.4316" width="12.4091" height="12.4091" rx="6.20455" fill="white"/>
<rect x="78.5918" y="16.5454" width="12.4091" height="12.4091" rx="6.20455" fill="white"/>
<rect x="78.5918" y="59.9773" width="12.4091" height="12.4091" rx="6.20455" fill="white"/>
<rect x="37.2266" y="76.5227" width="12.4091" height="12.4091" rx="6.20455" fill="white"/>
<rect y="53.7727" width="12.4091" height="12.4091" rx="6.20455" fill="white"/>
<rect x="6.20508" y="16.5454" width="12.4091" height="12.4091" rx="6.20455" fill="white"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(91)} height={getSizeHeight(89)} {...props} />
);