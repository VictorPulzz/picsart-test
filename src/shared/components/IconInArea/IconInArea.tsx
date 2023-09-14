import clsx from 'clsx';
import React, { CSSProperties, FC, HTMLAttributes } from 'react';

import { Icon, IconsType } from '~/shared/components';

import styles from './IconInArea.module.scss';

interface IconInAreaProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  icon?: IconsType;
  iconSize?: number;
  variant?: 'default' | 'circle' | 'white-shadow';
  color?: HTMLAttributes<HTMLDivElement>['className'];
  raw?: boolean;
}

export const IconInArea: FC<IconInAreaProps> = ({
  icon = 'notFoundCases',
  size = 72,
  className = 'text-secondary-green bg-secondary-green/10',
  style,
  variant = 'default',
  role,
  onClick,
  iconSize,
  raw,
  ...props
}) => {
  return (
    <div
      {...(onClick
        ? {
            role: 'button',
            onClick,
          }
        : {})}
      className={clsx(
        styles.block,
        styles[`block_${variant}`],
        onClick && styles.block_clickable,
        className,
      )}
      style={{ '--size': `${size}px`, ...style } as CSSProperties}
      {...props}
    >
      <Icon
        name={icon as IconsType}
        width={iconSize || size / 1.7}
        height={iconSize || size / 1.7}
        raw={raw}
      />
    </div>
  );
};
