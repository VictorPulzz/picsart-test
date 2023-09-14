import { PaginationState, SortingState } from '@tanstack/table-core';
import React, { FC, useState } from 'react';

import { UsersTableModel } from '~/entities/User';
import { useUsersTable } from '~/features/Users';
import { Table } from '~/shared/components';

const LIMIT = 12;

export const Home: FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: LIMIT,
  });

  const { columns, data, isLoading, resultData } = useUsersTable({
    page: pageIndex,
    limit: pageSize,
    params: {},
  });

  return (
    <Table<UsersTableModel>
      {...{ columns, data, isLoading, sorting, setSorting }}
      onClickRow={row => console.log(row.original.id)}
      currentPage={pageIndex}
      limit={LIMIT}
      count={resultData?.count}
      setPage={setPagination}
      paginationClassName="px-8"
      enableSorting
      hiddenSortingCols={['actions']}
    />
  );
};
