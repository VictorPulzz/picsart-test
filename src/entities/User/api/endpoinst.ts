import { rtkQuery } from '~/core/api';

import {
  GetAllUsersRequest,
  GetAllUsersResponse,
  GetUsersRequest,
  GetUsersResponse,
} from './types';

const userApi = rtkQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: params => ({
        url: `users`,
        params,
      }),
    }),
    getUsersAll: builder.query<GetAllUsersResponse, GetAllUsersRequest>({
      query: () => ({
        url: `users/all`,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
