import { Instantiate } from 'miragejs/-types';

import { AppRegistry } from '~/mock-server/types';

export const transformToPagination = <T extends keyof AppRegistry>(
  list: Instantiate<AppRegistry, T>[],
  qp: AnyObject,
) => {
  const page = Number(qp.page);
  const limit = Number(qp.limit);
  const start = page * limit;
  const end = start + limit;
  const data = list.slice(start, end);

  return {
    data,
    page,
    totalPage: Math.round(list.length / limit),
    limit,
    count: list.length,
  };
};
