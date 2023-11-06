import { UserDetails } from "./customer";

export interface Employee {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  dob: string;
  dateCreated: string;
  departmentId: number;
  departmentName: string;
  skillLevel: string;
  availability: string;
  isSupervisor: number;
  extension: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  fullName: string;
}

export interface AddEmployeeDto {
  email: string;
  role: string;
  userDetails: UserDetails;
  extension: string;
  departmentId: number;
  skillLevel: string;
  password: string;
  availability?: string;
}
