import { AccessorFn, createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import {
  GetUsersResponse,
  useGetUsersQuery,
  USER_TABLE_HEADERS,
  UsersTableModel,
  UserTableHeaderCellEnum,
} from '~/entities/User';
import { Typography } from '~/shared/components';
import { Avatar } from '~/shared/components/Avatar';

const columnHelper = createColumnHelper<UsersTableModel>();

type TableHookReturn<T, P> = {
  data: T[];
  resultData: P;
  columns: ColumnDef<T>[];
  isLoading: boolean;
};

interface UseAllCasesTableFn {
  ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
    params: AnyObject;
  }): TableHookReturn<UsersTableModel, Unidentifiable<GetUsersResponse>>;
}

export const useUsersTable: UseAllCasesTableFn = ({ page, limit, params }) => {
  const {
    isLoading,
    data: resultData,
    isFetching,
  } = useGetUsersQuery(
    {
      page,
      limit,
      ...params,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const columns = useMemo((): ColumnDef<UsersTableModel>[] => {
    const resultColumns: ColumnDef<UsersTableModel>[] = [];
    Object.entries(USER_TABLE_HEADERS).forEach(item => {
      return resultColumns.push(
        columnHelper.accessor(item[0] as unknown as AccessorFn<UsersTableModel, unknown>, {
          id: item[0],
          meta: {
            styles: {
              minWidth: '100px',
            },
          },
          cell: info => {
            if (info.cell.column.id === UserTableHeaderCellEnum.AVATAR) {
              const { avatar } = info.getValue() as UsersTableModel;
              return <Avatar avatar={avatar} size={32} className="mr-2.5" />;
            }
            if (info.cell.column.id === UserTableHeaderCellEnum.DOB) {
              return info.getValue() ? dayjs(info.getValue() as string).format() : '-';
            }
            return <Typography variant="p1">{info.getValue() as string}</Typography>;
          },
          header: String(item[1]),
        }),
      );
    });

    return resultColumns;
  }, []);

  const data = useMemo((): UsersTableModel[] => {
    if (isLoading || isFetching) return Array(5).fill({});
    if (!resultData?.data) return [];
    return resultData?.data.map(item => ({
      [UserTableHeaderCellEnum.ID]: item.id,
      [UserTableHeaderCellEnum.AVATAR]: item.avatar,
      [UserTableHeaderCellEnum.EMAIL]: item.email,
      [UserTableHeaderCellEnum.FULL_NAME]: `${item.firstName} ${item.lastName}`,
      [UserTableHeaderCellEnum.DOB]: item.dob,
      [UserTableHeaderCellEnum.ADDRESS]: item.address,
    }));
  }, [resultData, isLoading, isFetching]);

  return {
    columns,
    data,
    resultData,
    isLoading: isLoading || isFetching,
  };
};
