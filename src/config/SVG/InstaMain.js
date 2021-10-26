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
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.66563 0.66625C5.39875 0.6325 5.6325 0.625 7.5 0.625C9.3675 0.625 9.60125 0.633125 10.3337 0.66625C11.0662 0.699375 11.5662 0.81625 12.0037 0.985625C12.4619 1.15875 12.8775 1.42937 13.2212 1.77937C13.5712 2.1225 13.8413 2.5375 14.0138 2.99625C14.1838 3.43375 14.3 3.93375 14.3337 4.665C14.3675 5.39937 14.375 5.63312 14.375 7.5C14.375 9.3675 14.3669 9.60125 14.3337 10.3344C14.3006 11.0656 14.1838 11.5656 14.0138 12.0031C13.8412 12.4619 13.5708 12.8776 13.2212 13.2212C12.8775 13.5712 12.4619 13.8413 12.0037 14.0138C11.5662 14.1838 11.0662 14.3 10.335 14.3337C9.60125 14.3675 9.3675 14.375 7.5 14.375C5.6325 14.375 5.39875 14.3669 4.66563 14.3337C3.93438 14.3006 3.43438 14.1838 2.99688 14.0138C2.53808 13.8412 2.12239 13.5708 1.77875 13.2212C1.42899 12.8779 1.15832 12.4624 0.985625 12.0037C0.81625 11.5662 0.7 11.0662 0.66625 10.335C0.6325 9.60063 0.625 9.36687 0.625 7.5C0.625 5.6325 0.633125 5.39875 0.66625 4.66625C0.699375 3.93375 0.81625 3.43375 0.985625 2.99625C1.15858 2.53755 1.42945 2.12207 1.77937 1.77875C2.12253 1.42906 2.5378 1.1584 2.99625 0.985625C3.43375 0.81625 3.93375 0.7 4.665 0.66625H4.66563ZM10.2781 1.90375C9.55312 1.87063 9.33562 1.86375 7.5 1.86375C5.66437 1.86375 5.44688 1.87063 4.72187 1.90375C4.05125 1.93438 3.6875 2.04625 3.445 2.14062C3.12438 2.26562 2.895 2.41375 2.65438 2.65438C2.42628 2.87628 2.25074 3.14643 2.14062 3.445C2.04625 3.6875 1.93438 4.05125 1.90375 4.72187C1.87063 5.44688 1.86375 5.66437 1.86375 7.5C1.86375 9.33562 1.87063 9.55312 1.90375 10.2781C1.93438 10.9487 2.04625 11.3125 2.14062 11.555C2.25063 11.8531 2.42625 12.1237 2.65438 12.3456C2.87625 12.5738 3.14688 12.7494 3.445 12.8594C3.6875 12.9538 4.05125 13.0656 4.72187 13.0963C5.44688 13.1294 5.66375 13.1362 7.5 13.1362C9.33625 13.1362 9.55312 13.1294 10.2781 13.0963C10.9487 13.0656 11.3125 12.9538 11.555 12.8594C11.8756 12.7344 12.105 12.5863 12.3456 12.3456C12.5738 12.1237 12.7494 11.8531 12.8594 11.555C12.9538 11.3125 13.0656 10.9487 13.0963 10.2781C13.1294 9.55312 13.1362 9.33562 13.1362 7.5C13.1362 5.66437 13.1294 5.44688 13.0963 4.72187C13.0656 4.05125 12.9538 3.6875 12.8594 3.445C12.7344 3.12438 12.5863 2.895 12.3456 2.65438C12.1237 2.42629 11.8536 2.25076 11.555 2.14062C11.3125 2.04625 10.9487 1.93438 10.2781 1.90375ZM6.62188 9.61938C7.11229 9.82352 7.65836 9.85107 8.16683 9.69733C8.6753 9.54358 9.11462 9.21807 9.40976 8.7764C9.70489 8.33473 9.83753 7.80429 9.78503 7.27569C9.73252 6.74709 9.49813 6.25311 9.12187 5.87812C8.88202 5.63842 8.59201 5.45488 8.27271 5.34072C7.95341 5.22655 7.61277 5.1846 7.27531 5.21789C6.93785 5.25117 6.61197 5.35886 6.32113 5.53321C6.03028 5.70755 5.78171 5.94422 5.59331 6.22616C5.40491 6.5081 5.28137 6.82831 5.23157 7.16373C5.18178 7.49915 5.20697 7.84143 5.30534 8.16595C5.40371 8.49046 5.5728 8.78913 5.80045 9.04045C6.0281 9.29177 6.30864 9.48949 6.62188 9.61938ZM5.00125 5.00125C5.32939 4.67311 5.71895 4.41281 6.14769 4.23523C6.57642 4.05764 7.03594 3.96623 7.5 3.96623C7.96406 3.96623 8.42358 4.05764 8.85231 4.23523C9.28105 4.41281 9.67061 4.67311 9.99875 5.00125C10.3269 5.32939 10.5872 5.71895 10.7648 6.14769C10.9424 6.57642 11.0338 7.03594 11.0338 7.5C11.0338 7.96406 10.9424 8.42358 10.7648 8.85231C10.5872 9.28105 10.3269 9.67061 9.99875 9.99875C9.33604 10.6615 8.43721 11.0338 7.5 11.0338C6.56279 11.0338 5.66396 10.6615 5.00125 9.99875C4.33854 9.33604 3.96623 8.43721 3.96623 7.5C3.96623 6.56279 4.33854 5.66396 5.00125 5.00125ZM11.8175 4.4925C11.8988 4.41579 11.9639 4.32355 12.0089 4.22123C12.054 4.11892 12.078 4.00861 12.0796 3.89683C12.0813 3.78506 12.0605 3.67409 12.0184 3.57051C11.9764 3.46692 11.914 3.37282 11.835 3.29377C11.7559 3.21473 11.6618 3.15235 11.5582 3.11032C11.4547 3.0683 11.3437 3.04748 11.2319 3.04911C11.1201 3.05074 11.0098 3.07478 10.9075 3.11981C10.8052 3.16484 10.713 3.22993 10.6362 3.31125C10.4871 3.46939 10.4054 3.67945 10.4086 3.89683C10.4117 4.11421 10.4995 4.3218 10.6532 4.47553C10.807 4.62925 11.0145 4.71702 11.2319 4.72019C11.4493 4.72336 11.6594 4.64168 11.8175 4.4925Z" fill="white"/>
</svg>
`;

export default ({...props}) => (
  <SvgXml xml={xml} width={getSizeWidth(15)} height={getSizeHeight(15)} {...props} />
);