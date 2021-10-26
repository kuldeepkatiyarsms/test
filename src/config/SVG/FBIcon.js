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
const xml = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.54188C0 11.2706 2.70813 14.3712 6.25 15V9.58313H4.375V7.5H6.25V5.83313C6.25 3.95813 7.45812 2.91687 9.16687 2.91687C9.70812 2.91687 10.2919 3 10.8331 3.08313V5H9.875C8.95813 5 8.75 5.45812 8.75 6.04187V7.5H10.75L10.4169 9.58313H8.75V15C12.2919 14.3712 15 11.2713 15 7.54188C15 3.39375 11.625 0 7.5 0C3.375 0 0 3.39375 0 7.54188Z" fill="white"/>
</svg>
`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(15)} height={getSizeHeight(15)} {...props} />
);