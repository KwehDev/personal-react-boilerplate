import React from 'react';

import getThemeBasedSvgColor from '../../constants/svgColor';
import { useTheme } from '../../context';

/**
 *
 * @param {{
 * height: string | number;
 * className: string;
 * }} props
 */
export default function AdSvg({ height, className }) {
  const { theme } = useTheme();

  const { primary } = getThemeBasedSvgColor(theme);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1061 530.892"
      height={height}
      className={className}
      aria-hidden
    >
      <path
        fill="#3f3d56"
        d="M828.79279 99.72701h-260.1696v-5.36232h-117.971v5.36232H189.41011a17.5985 17.5985 0 00-17.59852 17.59851v356.25219a17.59856 17.59856 0 0017.59852 17.59853h639.38268a17.59855 17.59855 0 0017.59851-17.59857V117.32552a17.5985 17.5985 0 00-17.59851-17.59851z"
      />
      <path d="M195.4058 130.82846h627.3913V484.7415H195.4058z" opacity=".1" />
      <circle cx="508.565" cy="114.742" r="6.435" fill={primary} />
      <path
        fill="#3f3d56"
        d="M864.00709 478.3067h-61.22931v-4.41154a.87468.87468 0 00-.87471-.8747h-20.9929a.87468.87468 0 00-.87471.8747v4.41154h-13.12057v-4.41154a.87468.87468 0 00-.8747-.8747h-20.99291a.87468.87468 0 00-.8747.8747v4.41154H731.052v-4.41154a.87468.87468 0 00-.87471-.8747H709.1844a.87468.87468 0 00-.87471.8747v4.41154h-13.12056v-4.41154a.87468.87468 0 00-.87471-.8747h-20.99291a.87468.87468 0 00-.8747.8747v4.41154h-13.12057v-4.41154a.87468.87468 0 00-.8747-.8747h-20.99291a.87468.87468 0 00-.87471.8747v4.41154h-13.12056v-4.41154a.87468.87468 0 00-.87471-.8747h-20.99291a.87468.87468 0 00-.8747.8747v4.41154h-13.12057v-4.41154a.87468.87468 0 00-.8747-.8747H422.28132a.87468.87468 0 00-.8747.8747v4.41154h-13.12057v-4.41154a.87468.87468 0 00-.8747-.8747h-20.99291a.87467.87467 0 00-.8747.8747v4.41154h-13.12057v-4.41154a.87468.87468 0 00-.87471-.8747h-20.9929a.87468.87468 0 00-.87471.8747v4.41154h-13.12057v-4.41154a.87468.87468 0 00-.8747-.8747h-20.99291a.87468.87468 0 00-.8747.8747v4.41154H300.6974v-4.41154a.87468.87468 0 00-.8747-.8747h-20.99291a.87468.87468 0 00-.87471.8747v4.41154h-13.12056v-4.41154a.87468.87468 0 00-.87471-.8747H242.9669a.87468.87468 0 00-.8747.8747v4.41154h-13.12057v-4.41154a.87468.87468 0 00-.8747-.8747H207.104a.87468.87468 0 00-.87471.8747v4.41154h-40.2364A20.99292 20.99292 0 00145 499.29961v9.49249a20.99292 20.99292 0 0020.99291 20.99286h698.01418A20.99292 20.99292 0 00885 508.7921v-9.49249a20.99292 20.99292 0 00-20.99291-20.99291z"
      />
      <path fill={primary} d="M382.20909 171h254v267h-254z" />
      <path
        fill="#2f2e41"
        d="M516.55009 159.91586s-21.6583-7.7351-35.58149 23.20532-35.58149 64.97489-35.58149 64.97489l12.37617 3.094s3.094-21.6583 10.82915-24.75234l-3.094 27.84638s92.82127 32.48745 134.59085-3.094l-1.547-10.82915s6.18808 1.547 6.18808 10.82915l4.64106-4.64107s-4.64106-9.28212-18.56425-21.65829c-9.13857-8.12318-12.279-23.57744-13.35817-33.23968a40.224 40.224 0 00-9.26065-21.90479c-9.25274-10.7233-26.11241-22.12064-51.63826-9.83042z"
      />
      <path
        fill="#ffb9b9"
        d="M396.87136 189.10686l-9-94s-18-51 9-47 11 43 11 43l15 98z"
      />
      <circle cx="527.871" cy="223.107" r="36" fill="#ffb9b9" />
      <path
        fill="#ffb9b9"
        d="M501.87136 239.10686s-2 41-12 44-38 36-25 46 88 3 88 3l-7-52s-16-11-3-30z"
      />
      <path
        fill="#3f3d56"
        d="M576.93907 440H435.53916c.51-9.05 1.79-21.83 3.42994-35.88.5-4.26 1.03-8.65 1.58007-13.08 4.84986-39.05 11.31983-81.93 11.31983-81.93l1.69995-3.93 17.30005-40.07.18017.07 22.81983 8.93.81006 3.84 6.18994 29.16 40.05-32.33 36.95-5.78 2.5-.39 4.5 42.5s-.2 9.5-.40991 23.03c-.24 15.55-.5 36.43-.48 54.32.01 8.55.08007 16.42.25 22.7.13989 5.29.35009 9.46.63989 11.95.67018 5.66997-2.88987 11.55998-7.92991 16.89z"
      />
      <path
        fill="#3f3d56"
        d="M471.871 270.107l-1-6-28-34-16-57-39 15 28 69 40 51 16-38z"
      />
      <path
        fill="#2f2e41"
        d="M480.57682 227.41224s12.37617-17.01723 23.20532-20.11128 12.37617-18.56425 12.37617-18.56425 27.84638 30.94042 44.86362 32.48744 1.547-37.12851 1.547-37.12851l-30.94043-7.7351-29.3934 3.094-23.2053 15.47021z"
      />
      <path
        fill="#ffb9b9"
        d="M580.20909 406l-95.67237 3.79481s-52.71966 12.068-45.66742-14.29988 43.97375-6.02576 43.97375-6.02576l99.07116-3.729z"
      />
      <path
        fill="#3f3d56"
        d="M569.37136 275.60686l9-7s15-8 18 20 25 121 3 122-78 2-78 2l6-31 46-3z"
      />
      <path d="M572.371 318.607l-3 57-44 9 40-16 7-50z" opacity=".15" />
      <path fill={primary} d="M286.9004 0h244v64h-244z" />
      <path fill="#3f3d56" d="M0 528.89248h1061v2H0z" />
      <path
        fill={primary}
        d="M957.95708 459.02857c14.376 15.42642 15.119 38.1 15.119 38.1s-22.56495-2.33763-36.94091-17.764-15.119-38.1-15.119-38.1 22.56495 2.33758 36.94091 17.764z"
      />
      <path
        fill={primary}
        d="M1003.2141 483.10747c-15.42642 14.37595-38.1 15.119-38.1 15.119s2.33763-22.56495 17.764-36.94091 38.1-15.119 38.1-15.119-2.33758 22.56495-17.764 36.94091z"
      />
      <path
        fill="#3f3d56"
        d="M999.38014 528.89248H942.641a5.8034 5.8034 0 01-5.21862-3.26461l-12.35345-25.3932a5.8034 5.8034 0 015.21862-8.34219h81.446a5.8034 5.8034 0 015.21862 8.34219l-12.35345 25.3932a5.80339 5.80339 0 01-5.21858 3.26461z"
      />
      <path
        fill={primary}
        d="M60.95708 459.02857c14.376 15.42642 15.119 38.1 15.119 38.1s-22.56495-2.33763-36.94091-17.764-15.119-38.1-15.119-38.1 22.56495 2.33758 36.94091 17.764z"
      />
      <path
        fill="#3f3d56"
        d="M93.38014 528.89248H36.641a5.8034 5.8034 0 01-5.21862-3.26461l-12.35345-25.3932a5.8034 5.8034 0 015.21862-8.34219h81.446a5.8034 5.8034 0 015.21862 8.34219l-12.35345 25.3932a5.80339 5.80339 0 01-5.21858 3.26461z"
      />
      <path fill="#fff" d="M317.9004 25.72312h182v12.55376h-182z" />
    </svg>
  );
}