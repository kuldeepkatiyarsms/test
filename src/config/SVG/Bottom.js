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
<path d="M12.066 2C7.61918 2 4 5.62062 4 10.0675C4 17.892 11.6119 23.8403 11.6119 23.8403C11.8793 24.0532 12.2584 24.0532 12.5258 23.8403C12.5258 23.8403 20.1392 17.892 20.1392 10.0675C20.1392 5.62062 16.5129 2 12.066 2ZM12.066 6.40186C14.0826 6.40186 15.7373 8.0509 15.7373 10.0675C15.7374 12.084 14.0826 13.7373 12.066 13.7373C10.0495 13.7373 8.40041 12.084 8.40043 10.0675C8.40043 8.0509 10.0495 6.40186 12.066 6.40186Z" fill="#F18261"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(25)} height={getSizeHeight(25)} {...props} />
);