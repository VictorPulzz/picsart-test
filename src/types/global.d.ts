declare type Nullable<T> = T | null;

declare type NotNullable<T> = T extends null | undefined ? never : T;

declare type Unidentifiable<T> = T | undefined;

declare type Negative<T> = T | undefined | null | false;

declare type ValueOf<T> = T[keyof T];

declare type AnyObject = Record<string, any>;
