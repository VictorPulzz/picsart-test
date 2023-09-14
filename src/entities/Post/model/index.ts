import { UserModel } from '~/entities/User';

export type PostModel = {
  id: number;
  userId: UserModel['id'];
  text: string;
  createdAt: string;
};
