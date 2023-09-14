import clsx from 'clsx';
import React, { FC, HTMLAttributes, PropsWithChildren, useMemo } from 'react';

import styles from './Typography.module.scss';

export type TypographyVariantsType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'p5'
  | 'p6';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  tag?: keyof Pick<
    JSX.IntrinsicElements,
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'small'
    | 'strong'
    | 'b'
    | 's'
    | 'i'
    | 'em'
  >;
  variant: TypographyVariantsType;
}

export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  tag = 'span',
  variant,
  children,
  className,
  onClick,
  ...props
}) => {
  const Component = tag;
  const classes = useMemo(
    () => clsx(styles[variant], onClick && styles.clickable, className),
    [className, onClick, variant],
  );

  return (
    <Component className={classes} {...props} {...(onClick ? { onClick } : {})}>
      {children}
    </Component>
  );
};
