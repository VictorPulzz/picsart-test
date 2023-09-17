import React, { FC } from 'react';

import { TaskModel } from '~/entities/Task';
import { Typography } from '~/shared/components';
import { Avatar } from '~/shared/components/Avatar';

interface TaskItemProps extends TaskModel {}

export const TaskItem: FC<TaskItemProps> = ({ id, description, user }) => {
  return (
    <div className="flex items-center mb-3">
      <Typography variant="p1" className="mr-3">
        {id}
      </Typography>
      <div className="flex items-center min-w-[200px]">
        <Avatar avatar={user?.avatar} />
        <div className="ml-3">
          <Typography variant="p2" className="block">
            {user?.firstName}
          </Typography>
          <Typography variant="p2">{user?.lastName}</Typography>
        </div>
      </div>
      <Typography variant="p1">{description}</Typography>
    </div>
  );
};
