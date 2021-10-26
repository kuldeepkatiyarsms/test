import React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.75 14.25C12.0637 14.25 14.75 11.5637 14.75 8.25C14.75 4.93629 12.0637 2.25 8.75 2.25C5.43629 2.25 2.75 4.93629 2.75 8.25C2.75 11.5637 5.43629 14.25 8.75 14.25Z" stroke="#A6A3A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="9" cy="8" r="6" fill="#A6A3A2"/>
<path d="M16.2503 15.7503L12.9878 12.4878" stroke="#A6A3A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.5 8.25H11" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.75 6V10.5" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({...props}) => (
  <SvgXml xml={xml} width="19" height="18" {...props} />
);