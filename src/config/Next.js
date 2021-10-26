import React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.707107" y1="1.29289" x2="6.70711" y2="7.29289" stroke="#F18261" stroke-width="2"/>
<line x1="5.68635" y1="6.72727" x2="0.686483" y2="11.4458" stroke="#BA4646" stroke-width="2"/>
</svg>`;

export default ({...props}) => (
  <SvgXml xml={xml} width="8" height="13" {...props} />
);