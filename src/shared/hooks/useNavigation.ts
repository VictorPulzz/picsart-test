import { useCallback, useMemo } from 'react';
import { matchPath, matchRoutes, RouteMatch, useLocation, useNavigate } from 'react-router-dom';

import { ROUTES, RoutesList } from '~/core/router';
import { useSearchParams } from '~/shared/hooks/useSearchParams';

type CurrentRoute = Nullable<Omit<RouteMatch, 'route'> & { route: RoutesList }>;

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useSearchParams();
  const routes = ROUTES;

  const isSameRoute = useCallback(
    (routeName: string) => {
      const match = matchPath(location.pathname, routeName);
      return !!match;
    },
    [location.pathname],
  );

  const currentRoute = useMemo(() => {
    const match = matchRoutes(routes, location);
    if (match) {
      return match[0];
    }
    return null;
  }, [location, routes]) as CurrentRoute;

  return {
    location,
    routes,
    isSameRoute,
    currentRoute,
    navigate,
    params,
    canBack: location.key !== 'default',
  };
};
