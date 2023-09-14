import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RoutesList } from '~/core/router/routes';
import { NotFoundPage } from '~/pages/NotFound';
import { PageContainer } from '~/shared/components';
import { useNavigation } from '~/shared/hooks/useNavigation';

export const Router: FC = () => {
  const { location, routes } = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {routes.map((item, index) => {
        const PageComponent = item.component as FC<RoutesList>;
        return (
          <Route
            key={index}
            path={item.path}
            element={
              <PageContainer {...item}>
                <PageComponent {...item} />
              </PageContainer>
            }
          />
        );
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
