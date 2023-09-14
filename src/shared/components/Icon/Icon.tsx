import React, { FC } from 'react';

import icons from '~/resources/icons';

export type IconsType = keyof typeof icons;

export interface IconProps {
  name: IconsType;
  className?: string;
  width?: string | number;
  height?: string | number;
  size?: number;
  raw?: boolean;
  fill?: string;
  stroke?: string;
  onClick?: () => void;
}

export const Icon: FC<IconProps> = ({
  name,
  className,
  width = '100%',
  height = '100%',
  raw,
  size,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size !== undefined ? size : width}
    height={size !== undefined ? size : height}
    className={className}
    {...props}
  >
    <use
      xlinkHref={
        raw ? `/icons/raw-spritemap.svg#sprite-${name}` : `/icons/spritemap.svg#sprite-${name}`
      }
    />
  </svg>
);
