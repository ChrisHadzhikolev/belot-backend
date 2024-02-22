export interface IUser {
  id?: string;
  name?: string;
  password?: string;
  role?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}