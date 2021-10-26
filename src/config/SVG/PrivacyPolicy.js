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
<path d="M19.4 20.2004V11.2004C19.4 10.2104 18.59 9.40039 17.6 9.40039H6.8C5.81 9.40039 5 10.2104 5 11.2004V20.2004C5 21.1904 5.81 22.0004 6.8 22.0004H17.6C18.59 22.0004 19.4 21.1904 19.4 20.2004ZM14 15.7004C14 16.6904 13.19 17.5004 12.2 17.5004C11.21 17.5004 10.4 16.6904 10.4 15.7004C10.4 14.7104 11.21 13.9004 12.2 13.9004C13.19 13.9004 14 14.7104 14 15.7004Z" fill="#F18261"/>
<path d="M16.6992 13C16.6992 12.64 16.6992 8.86 16.6992 8.5C16.6992 5.98 14.7192 4 12.1992 4C9.67922 4 7.69922 5.98 7.69922 8.5C7.69922 8.86 7.69922 12.64 7.69922 13" stroke="#F18261" stroke-width="2" stroke-miterlimit="10"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(25)} height={getSizeHeight(25)} {...props} />
);