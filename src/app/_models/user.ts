import {UserRole} from "./user-role";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: any;
  lockoutEnabled: boolean;
  lockoutEnd?: any;
  isActive: boolean;
  roles: UserRole[];
}
