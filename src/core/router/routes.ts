import { FC } from 'react';

import { Home } from '~/pages/Home';
import { UserDetail } from '~/pages/UserDetail';
import { Users } from '~/pages/Users';

export enum RoutesPathList {
  HOME = '/',
  USERS = '/users',
  USERS_DETAIL = '/users/:id',
}

export type RoutesList = {
  path: RoutesPathList;
  component: FC<RoutesList>;
  header: AnyObject;
  inMenu: boolean;
};

export const ROUTES: RoutesList[] = [
  {
    path: RoutesPathList.HOME,
    component: Home,
    header: {
      title: 'Home',
    },
    inMenu: true,
  },
  {
    path: RoutesPathList.USERS,
    component: Users,
    header: {
      title: 'Users',
    },
    inMenu: true,
  },
  {
    path: RoutesPathList.USERS_DETAIL,
    component: UserDetail,
    header: {
      title: 'User detail',
    },
    inMenu: false,
  },
];
