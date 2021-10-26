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
const xml = `<svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.11415 6.9978L6.75462 1.69723C6.91412 1.50804 7.00223 1.25479 6.99996 0.99204C6.99769 0.729293 6.90522 0.478081 6.74248 0.292527C6.57973 0.106973 6.35974 0.00192899 6.12989 2.63029e-05C5.90005 -0.00187638 5.67875 0.0995146 5.51367 0.282355L0.255329 6.28827C0.0963454 6.47053 0.0049624 6.71585 0.000196221 6.97318C-0.00456996 7.23052 0.0776478 7.48004 0.22974 7.66983L5.50915 13.7176C5.67423 13.9005 5.89553 14.0019 6.12537 14C6.35522 13.9981 6.57521 13.893 6.73795 13.7075C6.9007 13.5219 6.99317 13.2707 6.99544 13.008C6.99771 12.7452 6.9096 12.492 6.75009 12.3028L2.11415 6.9978Z" fill="#2D3E4D"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(7)} height={getSizeHeight(14)} {...props} />
);