import { rtkQuery } from '~/core/api';
import { tags } from '~/core/api/tags';

import { GetTasksRequest, GetTasksResponse } from './types';

const taskApi = rtkQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getTasks: builder.query<GetTasksResponse, GetTasksRequest>({
      query: params => ({
        url: `tasks`,
        params,
      }),
      providesTags: [tags.TASK_LIST],
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
