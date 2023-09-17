import { Instantiate } from 'miragejs/-types';

import { TaskModel } from '~/entities/Task';
import { UserModel } from '~/entities/User';
import { AppRegistry } from '~/mock-server/types';

export const UserDto = ({
  id,
  avatar,
  dob,
  firstName,
  lastName,
  email,
  address,
}: Instantiate<AppRegistry, 'user'>) => ({
  id: Number(id),
  avatar,
  dob,
  firstName,
  lastName,
  email,
  address,
});

export const userTransformer = (users: Instantiate<AppRegistry, 'user'>[]): UserModel[] => {
  return users.map(UserDto);
};

export const TaskDto = ({
  id,
  description,
  user,
  userId,
  createdAt,
}: Instantiate<AppRegistry, 'task'>) => ({
  id: Number(id),
  description,
  user,
  userId,
  createdAt,
});

export const taskTransformer = (tasks: Instantiate<AppRegistry, 'task'>[]): TaskModel[] => {
  return tasks.map(TaskDto);
};
