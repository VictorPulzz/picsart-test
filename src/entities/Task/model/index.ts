import { UserModel } from '~/entities/User';

export type TaskModel = {
  id: number;
  userId: UserModel['id'];
  user: Nullable<UserModel>;
  description: string;
  createdAt: string;
};
