import { FC, PropsWithChildren } from 'react';

import { RoutesList } from '~/core/router';
import { useMeta } from '~/shared/hooks/useMeta';

export const PageContainer: FC<PropsWithChildren<RoutesList>> = ({ children, header }) => {
  useMeta({
    title: header?.title || '',
  });

  return children;
};
