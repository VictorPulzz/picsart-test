import { useMemo } from 'react';

interface UseListSkeletonFn {
  (count?: number): number[];
}

export const useListSkeleton: UseListSkeletonFn = (count = 3) =>
  useMemo(() => [...Array(count).keys()], [count]);
