import clsx from 'clsx';
import React, { FC, HTMLAttributes, useMemo } from 'react';

import { Box, Icon } from '~/shared/components';

import styles from './Pagination.module.scss';

export interface PaginationProps extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  currentPage?: number;
  count?: number;
  limit?: number;
  onChange?: (page: number) => void;
}

const DOTS = '...';
const SIBLING_COUNT = 1;
const LIMIT = 10;

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const Pagination: FC<PaginationProps> = ({
  onChange,
  count,
  currentPage,
  limit = LIMIT,
  className,
}) => {
  const paginationRange = useMemo(() => {
    if (currentPage === undefined) return [];
    const totalPageCount = Math.ceil((count || 0) / limit);

    const totalPageNumbers = SIBLING_COUNT + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);

    const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPageCount);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * SIBLING_COUNT;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * SIBLING_COUNT;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }, [currentPage, limit, count]);

  if (paginationRange.length < 2 || !limit || currentPage === undefined) {
    return null;
  }

  const lastPage = (paginationRange[paginationRange.length - 1] as number) - 1;

  return (
    <Box variant="row_center_left" className={clsx(styles.container, className)}>
      <div
        role={currentPage !== 0 ? 'button' : 'none'}
        className={clsx(
          styles.container__item,
          currentPage === 0 && styles.container__item_disabled,
        )}
        {...(currentPage !== 0
          ? {
              onClick: () => onChange?.(currentPage - 1),
            }
          : {})}
      >
        <Icon name="arrowBack" width={10} height={10} />
      </div>

      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <div className="dots" key={pageNumber}>
              &#8230;
            </div>
          );
        }
        return (
          <div
            key={pageNumber}
            role="button"
            className={clsx(
              styles.container__item,
              Number(pageNumber) - 1 === currentPage && styles.container__item_disabled,
            )}
            onClick={() => onChange?.(+pageNumber - 1)}
          >
            {pageNumber}
          </div>
        );
      })}

      <div
        role={currentPage !== lastPage ? 'button' : 'none'}
        className={clsx(
          styles.container__item,
          currentPage === lastPage && styles.container__item_disabled,
        )}
        {...(currentPage !== lastPage
          ? {
              onClick: () => onChange?.(currentPage + 1),
            }
          : {})}
      >
        <Icon name="arrowBack" width={10} height={10} className="rotate-180" />
      </div>
    </Box>
  );
};
