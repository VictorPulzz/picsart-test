import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '~/shared/configs';

import { tags } from './tags';

export const rtkQuery = createApi({
  reducerPath: 'rtkReducer',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: Object.values(tags),
  endpoints: () => ({}),
});
