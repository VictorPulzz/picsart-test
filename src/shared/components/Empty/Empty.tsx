import clsx from 'clsx';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { IconInArea, Typography } from '~/shared/components';

import styles from './Empty.module.scss';

export interface EmptyProps extends PropsWithChildren<unknown>, HTMLAttributes<HTMLDivElement> {
  title?: string;
  subTitle?: string;
}

export const Empty: FC<EmptyProps> = ({
  title = 'Not found',
  subTitle,
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      <IconInArea variant="circle" className="text-secondary-green bg-secondary-green/10 mb-8" />
      <Typography variant="h2" className="mb-4 text-center" tag="h2">
        {title}
      </Typography>
      {subTitle && (
        <Typography variant="p1" className="text-gray" tag="h2">
          {subTitle}
        </Typography>
      )}
      {!!children && <div className="mt-6">{children}</div>}
    </div>
  );
};
