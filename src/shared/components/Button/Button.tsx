import clsx from 'clsx';
import React, { ButtonHTMLAttributes, FC, MouseEvent, PropsWithChildren, useMemo } from 'react';

import { IconProps, Typography, TypographyVariantsType } from '~/shared/components';

import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
  size?: 'small' | 'regular' | 'little';
  full?: boolean;
  isLoading?: boolean;
  label?: string;
  icon?: IconProps;
  labelVariant?: TypographyVariantsType;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  type = 'button',
  variant = 'primary',
  size = 'regular',
  label,
  full,
  disabled,
  className,
  icon,
  isLoading,
  onClick,
  children,
  ...props
}) => {
  const classes = useMemo(() => {
    return clsx(
      styles['btn'],
      styles[`btn_${variant}`],
      styles[`btn_${size}`],
      disabled && styles[`btn_disabled`],
      full && styles[`btn_full`],
      isLoading && styles[`btn_loading`],
      className,
    );
  }, [variant, size, disabled, full, isLoading, className]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (disabled || isLoading) return;
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button type={type} disabled={disabled} className={classes} onClick={handleClick} {...props}>
      <Typography variant="p1">{label}</Typography>
    </button>
  );
};
