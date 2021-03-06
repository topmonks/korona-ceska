import React, { useMemo } from 'react';
import { getValueTitle } from './library';

const iconPathDs = {
  virus: "M20.8,10.4c-0.7,0.5-1.5,0.8-2.4,0.8c-1.6,0-2.4-2-1.3-3.1c0.6-0.6,1.4-1,2.3-1.1c1.6-0.2,2.3-2.2,1.1-3.4S17.3,3,17,4.7c-0.1,0.9-0.5,1.7-1.1,2.3c-1.1,1.1-3.1,0.3-3.1-1.3c0-0.9,0.3-1.7,0.8-2.4C14.6,1.9,13.7,0,12,0c-1.7,0-2.6,1.9-1.6,3.2c0.5,0.7,0.8,1.5,0.8,2.4c0,1.6-2,2.4-3.1,1.3C7.5,6.3,7.1,5.5,7,4.7C6.7,3,4.7,2.3,3.5,3.5S3,6.7,4.7,7c0.9,0.1,1.7,0.5,2.3,1.1c1.1,1.1,0.3,3.1-1.3,3.1c-0.9,0-1.7-0.3-2.4-0.8C1.9,9.4,0,10.3,0,12c0,1.7,1.9,2.6,3.2,1.6c0.7-0.5,1.5-0.8,2.4-0.8c1.6,0,2.4,2,1.3,3.1c-0.6,0.6-1.4,1-2.3,1.1c-1.6,0.2-2.3,2.2-1.1,3.4S6.7,21,7,19.3c0.1-0.9,0.5-1.7,1.1-2.3c1.1-1.1,3.1-0.3,3.1,1.3c0,0.9-0.3,1.7-0.8,2.4c-1,1.3-0.1,3.2,1.6,3.2c1.7,0,2.6-1.9,1.6-3.2c-0.5-0.7-0.8-1.5-0.8-2.4c0-1.6,2-2.4,3.1-1.3c0.6,0.6,1,1.4,1.1,2.3c0.2,1.6,2.2,2.3,3.4,1.1c1.2-1.2,0.5-3.2-1.1-3.4c-0.9-0.1-1.6-0.5-2.3-1.1c-1.1-1.1-0.3-3.1,1.3-3.1c0.9,0,1.7,0.3,2.4,0.8c1.3,1,3.2,0.1,3.2-1.6C24,10.3,22.1,9.4,20.8,10.4z M10,14.7c-0.5,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,14.7,10,14.7z M11.3,11.5c-0.9,0-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6s1.6,0.7,1.6,1.6S12.2,11.5,11.3,11.5zM14.2,14.5c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3s1.3,0.6,1.3,1.3S15,14.5,14.2,14.5z",
  health: "M12,4.4C10-1,0-0.2,0,8c0,4.1,3.1,9.5,12,15c8.9-5.5,12-10.9,12-15C24-0.1,14-1,12,4.4z",
  economy: "M7,21H3V10h4V21z M14,10h-4v11h4V10z M21,10h-4v11h4V10z M23,22H1v2h22V22z M0,9h24L12,0L0,9z",
  trust: "M20.8,18.1c-3.4-0.8-6.6-1.5-5.1-4.4C20.5,4.8,17,0,12,0C6.9,0,3.5,4.9,8.3,13.7c1.6,2.9-1.7,3.6-5.1,4.4C0.1,18.8,0,20.3,0,23l0,1h24l0-1C24,20.3,23.9,18.8,20.8,18.1z",
}

const RED_COLOR = '#CD2500';
const OUK_COLOR = '#FFFFFF';
const FOK_COLOR = '#4A4B7E';

export default function ValueIcon({ value, type, large = false, small = false, loose = false, className, prefix = 'game' }) {
  const pathD = useMemo(() => iconPathDs[type], [type]);
  const level = useMemo(() => (24 / 100 * (100 - value)), [value]);
  const color = useMemo(() => type === 'virus' ? RED_COLOR : OUK_COLOR, [type]);

  const size = useMemo(() => {
    if (!large && !small) return '64px';
    if (small) return '48px';
    if (large) return '80px';
  }, [large, small]);

  const highlightValue = value < 25;

  return (
    <svg
      version="1.1"
      x="0px" y="0px" viewBox="0 0 24 24"
      width={size} height={size}
      className={`value-icon ${className || ''}`}
      role="img"
    >
      <title>{getValueTitle({ type, value })}</title>
      <g>
        <defs>
          <clipPath id={`${prefix}-value-level-${type}`}>
            <rect x="0" y="0" width="24" height={level} />
          </clipPath>
        </defs>
        <path fill={highlightValue ? RED_COLOR : color} d={pathD} />
        <path
          clipPath={`url(#${prefix}-value-level-${type})`}
          fill={loose ? RED_COLOR : FOK_COLOR}
          stroke={loose ? RED_COLOR : FOK_COLOR}
          // strokeWidth="1px"
          d={pathD}
        />
      </g>
    </svg>
  )
}
