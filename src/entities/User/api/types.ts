import { PaginationTypeRequest, PaginationTypeResponse } from '~/core/api';
import { UserModel } from '~/entities/User';

export type GetUsersRequest = PaginationTypeRequest;
export type GetUsersResponse = PaginationTypeResponse<UserModel>;

export type GetAllUsersRequest = void;
export type GetAllUsersResponse = UserModel[];

export type GetUserRequest = Pick<UserModel, 'id'>;
export type GetUserResponse = { user: UserModel };

export type CreateUserRequest = UserModel;
export type CreateUserResponse = void;
