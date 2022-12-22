export interface UserForUpdate {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: any;
  userRoles: string[];
}

export interface UserRole {
  appRole: boolean;
  appRoleId: string;
}
