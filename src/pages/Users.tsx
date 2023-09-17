import { PaginationState, SortingState } from '@tanstack/table-core';
import debounce from 'lodash.debounce';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { UsersTableModel } from '~/entities/User';
import { useUsersTable } from '~/features/Users';
import { Box, Input, Table, Typography } from '~/shared/components';
import { Button } from '~/shared/components/Button';
import { UserModal } from '~/shared/components/Modals';

const LIMIT = 10;

export const Users: FC = () => {
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: LIMIT,
  });
  const [search, setSearch] = useState('');

  const debounceGetSearch = useCallback(debounce(setSearch, 500), []);

  useEffect(() => {
    debounceGetSearch(input);
  }, [input]);

  const sort = sorting.length
    ? {
        sortBy: sorting[0].id,
        sortType: sorting[0].desc,
      }
    : {};

  const { columns, data, isLoading, resultData } = useUsersTable({
    page: pageIndex,
    limit: pageSize,
    params: {
      search,
      ...sort,
    },
  });

  return (
    <>
      <div className="px-3 py-4">
        <Typography variant="p1">Search</Typography>
        <Box variant="row">
          <Input
            multiline={false}
            onChange={(val: any) => setInput(val.target.value)}
            className="w-full mr-3"
          />
          <Button label="AddUser" onClick={() => setVisible(true)} />
        </Box>
      </div>

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

      <UserModal visible={visible} toggleVisible={() => setVisible(!visible)} />
    </>
  );
};
