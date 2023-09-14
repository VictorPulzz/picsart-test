export type UserModel = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dob?: Nullable<string>;
  address?: Nullable<string>;
  avatar?: Nullable<string>;
};

export type UsersTableModel = Omit<UserModel, 'firstName' | 'lastName'> & {
  fullName: string;
  actions?: string;
};

export const enum UserTableHeaderCellEnum {
  ID = 'id',
  FULL_NAME = 'fullName',
  EMAIL = 'email',
  DOB = 'dob',
  ADDRESS = 'address',
  AVATAR = 'avatar',
}

export const USER_TABLE_HEADERS = {
  [UserTableHeaderCellEnum.ID]: 'User id',
  [UserTableHeaderCellEnum.AVATAR]: 'Avatar',
  [UserTableHeaderCellEnum.EMAIL]: 'Email',
  [UserTableHeaderCellEnum.FULL_NAME]: 'Full name',
  [UserTableHeaderCellEnum.DOB]: 'Date of Birth',
  [UserTableHeaderCellEnum.ADDRESS]: 'Address',
};
