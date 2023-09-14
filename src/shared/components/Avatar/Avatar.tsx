import clsx from 'clsx';
import React, { CSSProperties, FC, HTMLAttributes } from 'react';

import { Icon, Skeleton } from '~/shared/components';
import { useImageLoading } from '~/shared/hooks/useImageLoading';

import styles from './Avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  noImageIconSize?: number;
  avatar?: Nullable<string>;
  border?: boolean;
}

export const Avatar: FC<AvatarProps> = ({
  border = true,
  size = 42,
  noImageIconSize = 18,
  avatar,
  style,
  className,
  ...props
}) => {
  const { isLoading, image } = useImageLoading(avatar);

  return (
    <div
      className={clsx(
        styles.holder,
        border && 'border-1 border-solid border-stroke-light dark:border-shades-white-10',
        className,
      )}
      style={{ '--size': `${size}px`, ...style } as CSSProperties}
      {...props}
    >
      {isLoading && <Skeleton absolute />}
      {!image && !isLoading && (
        <Icon
          name="avatar"
          width={noImageIconSize}
          height={noImageIconSize}
          className="text-secondary-grey"
        />
      )}
      {image && !isLoading && <img src={image} alt="avatar" className={styles.holder__image} />}
    </div>
  );
};
