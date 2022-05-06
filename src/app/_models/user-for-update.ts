export interface UserForUpdate {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: any;
  userRoles: UserRole[];
}

export interface UserRole {
  appRole: boolean;
  appRoleId: string;
}
