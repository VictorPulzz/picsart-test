export type PaginationTypeResponse<T> = {
  data: T[];
  page: number;
  totalPage: number;
  limit: number;
  count: number;
};
export type PaginationTypeRequest<T = unknown> = T & {
  page: number;
  limit: Nullable<number>;
};
