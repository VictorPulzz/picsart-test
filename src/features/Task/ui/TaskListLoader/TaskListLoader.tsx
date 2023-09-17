import React, { FC, PropsWithChildren } from 'react';

import { Empty, Skeleton } from '~/shared/components';
import { useListSkeleton } from '~/shared/hooks';

interface TaskListLoaderProps extends PropsWithChildren {
  loading: boolean;
  empty: boolean;
}

export const TaskListLoader: FC<TaskListLoaderProps> = ({ empty, loading, children }) => {
  const skeleton = useListSkeleton(20);

  if (loading) {
    return (
      <>
        {skeleton.map(key => (
          <div key={key} className="flex items-center mb-2">
            <Skeleton width={20} height={20} className="mr-3" />
            <div className="flex items-center mr-8">
              <Skeleton width={40} height={40} full />
              <div>
                <Skeleton width={100} height={20} full className="ml-2 mb-1" />
                <Skeleton width={60} height={20} full className="ml-2" />
              </div>
            </div>
            <Skeleton width="50%" height={40} />
          </div>
        ))}
      </>
    );
  }
  if (empty) {
    return <Empty />;
  }
  return children;
};
