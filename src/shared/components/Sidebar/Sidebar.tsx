import clsx from 'clsx';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Icon, Typography } from '~/shared/components';
import { useNavigation } from '~/shared/hooks/useNavigation';

import styles from './Sidebar.module.scss';

export const Sidebar: FC = () => {
  const { routes, isSameRoute } = useNavigation();

  return (
    <nav className={styles.sidebar}>
      <ul className="w-full">
        {routes.map(({ path, header }, index) => (
          <li className="flex w-full" key={index}>
            <Link
              to={path}
              className={clsx(
                styles['sidebar-menu__item'],
                isSameRoute(path) && styles['sidebar-menu__item_active'],
              )}
            >
              {header?.iconMenu && <Icon width={15} name={header?.iconMenu} className="mr-2.5" />}
              <Typography
                tag="span"
                variant="h4"
                className={isSameRoute(path) ? 'text-primary' : ' text-secondary-grey'}
              >
                {header?.title}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
