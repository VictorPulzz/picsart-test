import orderBy from 'lodash.orderby';

type QueryParamsType =
  | {
      page: string;
      limit: string;
      search: string;
      sortBy: keyof AnyObject;
      sortType: boolean;
    }
  | AnyObject;

export const transformToPagination = <T extends AnyObject>(
  list: T[],
  qp: QueryParamsType,
  searchKeys?: (keyof T)[],
) => {
  const page = Number(qp.page);
  const limit = Number(qp.limit);
  const start = page * limit;
  const end = start + limit;
  let data = list;

  if (qp.sortBy) {
    data = orderBy(data, [qp.sortBy], [qp.sortType === 'true' ? 'desc' : 'asc']) as T[];
  }

  if (qp.search && searchKeys) {
    data = data.filter(item => {
      let includes = false;
      searchKeys.forEach(i => {
        includes = String(item[i]).toLowerCase().includes(qp.search.toLowerCase());
      });
      return includes;
    });
  }

  data = data.slice(start, end);

  return {
    data,
    page,
    totalPage: Math.round(list.length / limit),
    limit,
    count: list.length,
  };
};
