import { rtkQuery } from '~/core/api';
import { tags } from '~/core/api/tags';

import {
  CreateUserRequest,
  CreateUserResponse,
  GetAllUsersRequest,
  GetAllUsersResponse,
  GetUserRequest,
  GetUserResponse,
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
    getUser: builder.query<GetUserResponse, GetUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
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

export const { useGetUsersQuery, useCreateUserMutation, useGetUserQuery } = userApi;
