import { Roles } from "./global";

export interface LoginModel {
  uid: string;
  password: string;
}

export interface User {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  isSupervisor: boolean;
  token: string;
}
