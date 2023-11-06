export interface AddRentalDto {
  customerId: number;
  employeeId: number;
  truckId: number;
  dateOfRent: string;
  dateOfReturn: string;
}

export interface Rental {
  id: number;
  customerId: string;
  customerName: string;
  customerPhoneNumber: string;
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  employeeEmail: string;
  truckMake: string;
  truckModel: string;
  price: number;
  dateOfRent: string;
  dateOfReturn: string;
  dateCreated: string;
}
