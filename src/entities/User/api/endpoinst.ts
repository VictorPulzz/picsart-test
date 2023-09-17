import { rtkQuery } from '~/core/api';
import { tags } from '~/core/api/tags';

import {
  CreateUserRequest,
  CreateUserResponse,
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
      providesTags: [tags.USER_LIST],
    }),
    getUsersAll: builder.query<GetAllUsersResponse, GetAllUsersRequest>({
      query: () => ({
        url: `users/all`,
      }),
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: body => ({
        url: `users`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [tags.USER_LIST],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userApi;
