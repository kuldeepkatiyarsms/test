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
const xml = `<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.83369 0.352941C9.2615 -0.117647 13.7385 -0.117647 18.1663 0.352941C20.6262 0.562092 22.4957 2.54902 22.7417 5.1634C23.0861 8.35294 23.0861 11.5948 22.7417 14.8366C22.4957 17.3987 20.6262 19.3856 18.1663 19.6471C13.7385 20.1176 9.2615 20.1176 4.83369 19.6471C2.42299 19.3856 0.504278 17.3987 0.258289 14.8366C-0.0860963 11.5948 -0.0860963 8.35294 0.258289 5.1634C0.504278 2.54902 2.42299 0.562092 4.83369 0.352941ZM14.4273 8.9281L10.3439 6.4183C9.55668 5.89542 8.57273 6.52288 8.57273 7.46405V12.4837C8.57273 13.4771 9.55668 14.0523 10.3439 13.5817L14.4273 11.0719C15.2144 10.6013 15.2144 9.39869 14.4273 8.9281Z" fill="#F18261"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(23)} height={getSizeHeight(20)} {...props} />
);