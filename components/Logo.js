import { Flex } from './styled-components/Flex';

export default function Logo() {
  return (
    <svg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'>
      <g filter='url(#a)'>
        <path
          d='M50 250.001C50 112 112 50 250 50c149.999 0 200 62 200 200.001C450 400 399.999 450 250 450c-138 0-200-50-200-199.999Z'
          fill='#F4A261'
        />
        <g filter='url(#b)'>
          <g filter='url(#c)' fill='#fff'>
            <path d='M192.857 192h114.286v58H192.857v-58ZM150 250h85.714v58H150v-58ZM264.286 250H350v58h-85.714v-58Z' />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id='a'
          x='0'
          y='0'
          width='500'
          height='500'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='25' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix values='0 0 0 0 0.956863 0 0 0 0 0.635294 0 0 0 0 0.380392 0 0 0 0.25 0' />
          <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
          <feBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
        </filter>
        <filter
          id='b'
          x='150'
          y='192'
          width='200'
          height='120'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='4' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix values='0 0 0 0 0.956863 0 0 0 0 0.635294 0 0 0 0 0.380392 0 0 0 0.25 0' />
          <feBlend in2='shape' result='effect1_innerShadow' />
        </filter>
        <filter
          id='c'
          x='150'
          y='192'
          width='200'
          height='120'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='4' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix values='0 0 0 0 0.956863 0 0 0 0 0.635294 0 0 0 0 0.380392 0 0 0 0.2 0' />
          <feBlend in2='shape' result='effect1_innerShadow' />
        </filter>
      </defs>
    </svg>
  );
}
