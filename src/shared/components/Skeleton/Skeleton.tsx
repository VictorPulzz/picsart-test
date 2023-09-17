import clsx from 'clsx';
import React, { CSSProperties, FC, HTMLAttributes } from 'react';

import styles from './Skeleton.module.scss';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  absolute?: boolean;
  full?: boolean;
}

export const Skeleton: FC<SkeletonProps> = ({
  className,
  width = '100%',
  height = '100%',
  style,
  absolute = false,
  full,
  ...props
}) => {
  const convert = (v?: string | number) => (typeof v === 'number' ? `${v}px` : v);
  return (
    <div
      style={{ '--width': convert(width), '--height': convert(height), ...style } as CSSProperties}
      className={clsx(
        styles.skeleton,
        absolute && styles.skeleton_absolute,
        full && styles.skeleton_full,
        className,
      )}
      {...props}
    />
  );
};
