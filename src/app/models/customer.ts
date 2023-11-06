export interface AddCustomerDto {
    trn: number;
  phoneNumber: string;
  maritalStatus: number;
  userDetails: UserDetails;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  gender: number;
  dob: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Customer {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phoneNumber: string;
  maritalStatus: string;
  dateCreated: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  fullName: string;
}
