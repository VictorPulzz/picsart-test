import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { ColumnDef, PaginationState, RowData, SortingState } from '@tanstack/table-core';
import clsx from 'clsx';
import React, {
  CSSProperties,
  Dispatch,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  Ref,
  SetStateAction,
  useCallback,
  useImperativeHandle,
} from 'react';

import {
  Box,
  Empty,
  EmptyProps,
  Icon,
  Pagination,
  PaginationProps,
  Skeleton,
  Typography,
} from '~/shared/components';

import styles from './Table.module.scss';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    styles?: CSSProperties;
    innerStyles?: CSSProperties;
    ignoreCalcWidth?: boolean;
    data?: TData;
    value?: TValue;
  }
}

type DefaultRow = {
  id: string | number;
};

interface TableProps<T>
  extends HTMLAttributes<HTMLTableElement>,
    Pick<PaginationProps, 'count' | 'currentPage' | 'limit'> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading: boolean;
  empty?: EmptyProps;
  onClickRow?: (row: Row<T>) => void;
  classTable?: CSSProperties;
  withHover?: boolean;
  withPadding?: boolean;
  withHeader?: boolean;
  currentPage?: number;
  setPage?: Dispatch<SetStateAction<PaginationState>>;
  paginationClassName?: HTMLDivElement['className'];
  enableRowSelection?: boolean;
  rowSelection?: { [id: number]: boolean };
  setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;
  enableSorting?: boolean;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  hiddenSortingCols?: (keyof T)[];
}

export interface UploadContactsRefProps {
  toggleAllRowsSelected: (value?: boolean) => void;
  resetRowSelection: () => void;
}

type ForwardRefTableProps<T extends DefaultRow> = TableProps<T> & {
  ref?: Ref<UploadContactsRefProps>;
};

const BaseTable = <T extends DefaultRow>(
  {
    columns,
    data,
    className,
    isLoading,
    empty,
    onClickRow,
    classTable,
    withHover = true,
    withPadding = true,
    withHeader = true,
    enableRowSelection = false,
    currentPage,
    limit,
    count,
    setPage,
    paginationClassName,
    rowSelection,
    setRowSelection,
    sorting,
    setSorting,
    enableSorting,
    hiddenSortingCols,
    ...props
  }: TableProps<T>,
  ref: ForwardedRef<Unidentifiable<UploadContactsRefProps>>,
): ReactElement => {
  const { getRowModel, getHeaderGroups, toggleAllRowsSelected, setPageIndex, resetRowSelection } =
    useReactTable<T>({
      initialState: {
        rowSelection: {},
      },
      state: {
        ...(enableRowSelection ? { rowSelection } : {}),
        ...(enableSorting ? { sorting } : {}),
        pagination: {
          pageIndex: currentPage || 0,
          pageSize: limit || 0,
        },
      },
      pageCount: count ?? -1,
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      enableRowSelection,
      onRowSelectionChange: setRowSelection,
      onPaginationChange: setPage,
      manualPagination: true,
      manualSorting: true,
      onSortingChange: setSorting,
      getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
      getRowId: row => row?.id as string,
    });

  useImperativeHandle(ref, () => ({ toggleAllRowsSelected, resetRowSelection }), [
    toggleAllRowsSelected,
    resetRowSelection,
  ]);

  // This hack for calculate max width columns
  const cellWidth = (length: number): string => {
    const hiddenCountCell = getHeaderGroups()
      .map(item => item.headers.map(i => i.column.columnDef.meta?.ignoreCalcWidth))
      .flat()
      .filter(item => item);
    return `${Math.round(100 / (length - hiddenCountCell.length))}%`;
  };

  const renderHeader = useCallback(() => {
    return getHeaderGroups().map(headerGroup => {
      const headerLength = headerGroup.headers.length;
      return (
        <tr key={headerGroup.id} className={clsx(withPadding && 'px-8', styles.table__tr)}>
          {headerGroup.headers.map(header => {
            const sort = header.column.getIsSorted();
            const enableSort = !hiddenSortingCols?.includes(header.id as keyof T);
            return (
              <th
                key={header.id}
                style={{
                  maxWidth: cellWidth(headerLength),
                  ...header.column.columnDef.meta?.styles,
                }}
                className={clsx(styles.table__th, enableSort && 'cursor-pointer')}
                onClick={enableSort ? header.column.getToggleSortingHandler() : undefined}
              >
                <Typography
                  variant="p2"
                  className="py-1 flex items-center justify-start text-secondary-grey"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Typography>
                {enableSorting && enableSort && (
                  <Box variant="row_center" className="ml-2">
                    <Icon
                      name="arrowSort"
                      size={10}
                      className={clsx(
                        sort === 'asc' ? 'text-primary scale-110' : 'text-secondary-grey',
                        'mr-1.5 rotate-180',
                      )}
                    />
                    <Icon
                      name="arrowSort"
                      size={10}
                      className={clsx(
                        sort === 'desc' ? 'text-primary scale-110' : 'text-secondary-grey',
                      )}
                    />
                  </Box>
                )}
              </th>
            );
          })}
        </tr>
      );
    });
  }, [cellWidth, enableSorting, getHeaderGroups, hiddenSortingCols, withPadding]);

  const renderContent = useCallback(() => {
    const rows = getRowModel().rows;
    return rows.map((row, index) => {
      return (
        <tr
          key={row.id}
          className={clsx(
            styles.table__tr,
            !isLoading && withHover && styles.table__tr_hovered,
            withHover && 'cursor-pointer',
            withPadding && 'px-8',
            rows.length - 1 !== index ? 'border-b border-base' : '',
          )}
          onClick={() => onClickRow?.(row)}
        >
          {row.getVisibleCells().map(cell => {
            return (
              <td
                key={cell.id}
                style={{
                  maxWidth: cellWidth(row.getVisibleCells().length),
                  ...cell.column.columnDef.meta?.styles,
                }}
                className={styles.table__td}
              >
                <div
                  className="relative h-[72px] w-full flex items-center justify-start"
                  style={{
                    ...cell.column.columnDef.meta?.innerStyles,
                  }}
                >
                  {!isLoading ? (
                    <Typography variant="p2" className="truncate">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Typography>
                  ) : (
                    <Skeleton width="70%" height="50px" />
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  }, [cellWidth, getRowModel, isLoading, onClickRow, withHover, withPadding]);

  if (!data.length && !isLoading) {
    return <Empty {...{ ...empty }} />;
  }

  return (
    <>
      <div className={clsx(styles.table__wrapper, className)}>
        <table
          className={clsx(styles.table, classTable)}
          cellSpacing="0"
          cellPadding="0"
          {...props}
        >
          {withHeader && <thead className={styles.table__thead}>{renderHeader()}</thead>}
          <tbody className={styles.table__tbody}>{renderContent()}</tbody>
        </table>
      </div>

      <Box className={paginationClassName}>
        <Pagination
          {...{
            currentPage,
            limit,
            count,
            onChange: setPageIndex,
          }}
        />
      </Box>
    </>
  );
};

export const Table = forwardRef(BaseTable) as <T extends DefaultRow>(
  p: ForwardRefTableProps<T>,
) => ReactElement;
