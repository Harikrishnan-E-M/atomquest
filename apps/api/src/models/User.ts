export type UserRole = 'employee' | 'manager' | 'admin';

export type UserDocument = {
  name: string;
  email: string;
  role: UserRole;
};
