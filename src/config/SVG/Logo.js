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
const xml = `<svg width="104" height="103" viewBox="0 0 104 103" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.50417" y="14.8948" width="84.862" height="84.862" rx="22.6439" fill="#EF8364" stroke="#EF8364" stroke-width="5.00835"/>
<path d="M60.9361 71.3783H49.6472V49.56C49.8993 48.2687 50.4595 47.0737 51.4891 46.0827C52.5427 45.0685 54.1433 44.2149 56.5535 43.7328C58.1007 43.4234 60.205 43.6445 62.1051 44.4352C64.0046 45.2257 65.5667 46.5264 66.2164 48.2589C67.5755 51.8833 65.7679 55.0875 64.3871 56.4683L63.5682 57.2872L64.6041 57.8051C65.5345 58.2704 66.2641 58.8085 66.7836 59.6918C67.3124 60.5907 67.6787 61.9414 67.6787 64.1306C67.6787 65.6817 67.0041 67.5162 65.7905 68.961C64.5863 70.3946 62.9107 71.3783 60.9361 71.3783Z" fill="white" stroke="white" stroke-width="1.66945"/>
<path d="M55.6285 54.2249C55.3313 54.219 55.0211 54.2128 54.7026 54.2084C54.7223 52.6012 54.8108 51.405 55.0782 50.487C55.3696 49.4866 55.8638 48.8476 56.7781 48.3906C58.4956 47.5319 60.0263 47.9393 60.9071 48.8191C61.7856 49.6968 62.1073 51.1245 61.2299 52.5868C60.9136 53.1141 60.5653 53.452 60.1823 53.6818C59.793 53.9153 59.3248 54.0629 58.7336 54.1473C58.1365 54.2326 57.4471 54.2494 56.6259 54.2415C56.3176 54.2386 55.9824 54.2319 55.6285 54.2249Z" fill="#EC7F5F" stroke="#EC7F5F" stroke-width="1.66945"/>
<path d="M54.698 66.8322V60.0896V59.9141H59.42C60.594 59.9141 61.4971 60.1526 62.1011 60.6637C62.6777 61.1516 63.1316 62.0175 63.1316 63.6257C63.1316 64.8669 62.6357 65.6144 61.9247 66.0884C61.1657 66.5944 60.0874 66.8322 58.9148 66.8322H54.698Z" fill="#EC7F5F" stroke="#EC7F5F" stroke-width="1.66945"/>
<path d="M44.4727 72.0516H38.9804V59.9646H28.2704V72.0516H22.7781V43.8486H28.2704V55.277H38.9804V43.8486H44.4727V72.0516Z" fill="white"/>
<g filter="url(#filter0_d)">
<rect x="63.9995" width="33.0008" height="33.0008" rx="16.5004" fill="white"/>
<path d="M84.0176 13.4911H92.2584V19.4491H84.0176V28.7628H77.7399V19.4491H69.4763V13.4911H77.7399V4.56543H84.0176V13.4911Z" fill="#86C057"/>
</g>
<defs>
<filter id="filter0_d" x="57.3217" y="0" width="46.3563" height="46.3563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="6.6778"/>
<feGaussianBlur stdDeviation="3.3389"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>
`;

export default ({...props}) => (
  <SvgXml xml={xml} width={100} height={99} {...props} />
);