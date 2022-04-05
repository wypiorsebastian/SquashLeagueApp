export interface UserForList {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: any;
  lockoutEnabled: boolean;
}
