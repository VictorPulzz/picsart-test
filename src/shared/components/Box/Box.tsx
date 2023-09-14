import clsx from 'clsx';
import React, { FC, HTMLAttributes, useMemo } from 'react';

import styles from './Box.module.scss';

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'row'
    | 'full'
    | 'row_start'
    | 'row_center'
    | 'row_stretch'
    | 'row_center_left'
    | 'row_center_right'
    | 'row_center_between'
    | 'row_between'
    | 'col'
    | 'col_center'
    | 'col_stretch'
    | 'col_center_left'
    | 'col_center_right';
  full?: boolean;
}

export const Box: FC<BoxProps> = ({
  variant = 'row',
  full,
  className,
  onClick,
  children,
  ...rest
}) => {
  const classes = useMemo(() => {
    const cl = variant.includes('row') ? 'row' : variant.includes('col') ? 'col' : '';
    return clsx(
      styles[cl],
      styles[variant],
      full && 'w-full',
      onClick && 'transition-all hover:opacity-40 active:opacity-30',
    );
  }, [full, onClick, variant]);

  return (
    <div
      className={clsx(classes, className)}
      {...rest}
      {...(onClick ? { role: 'button', onClick } : {})}
    >
      {children}
    </div>
  );
};
