import { FC } from 'react';

import { Home } from '~/pages/Home';

export enum RoutesPathList {
  HOME = '/',
  USERS = '/users',
}

export type RoutesList = {
  path: RoutesPathList;
  component: FC<RoutesList>;
  header: AnyObject;
};

export const ROUTES: RoutesList[] = [
  {
    path: RoutesPathList.HOME,
    component: Home,
    header: {
      title: 'Home',
    },
  },
  {
    path: RoutesPathList.USERS,
    component: Home,
    header: {
      title: 'Users',
    },
  },
];
