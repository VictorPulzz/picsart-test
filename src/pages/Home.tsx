import React, { FC, useState } from 'react';

import { useGetTasksQuery } from '~/entities/Task/api';
import { TaskItem } from '~/features/Task';
import { TaskListLoader } from '~/features/Task/ui/TaskListLoader';
import { Pagination } from '~/shared/components';

export const Home: FC = () => {
  const limit = 10;
  const [page, setPage] = useState(0);

  const { isLoading, data, isFetching } = useGetTasksQuery(
    {
      page,
      limit,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <>
      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <TaskListLoader empty={!data?.count} loading={isLoading || isFetching}>
          {data?.data.map(item => <TaskItem key={item.id} {...item} />)}
        </TaskListLoader>
      </div>
      <Pagination
        {...{
          currentPage: page,
          limit,
          count: data?.count,
          onChange: setPage,
        }}
        className="px-3"
      />
    </>
  );
};
