export interface Department {
  id: number;
  name: string;
  phoneNumber: string;
  dateCreated: string;
  supervisorId: number;
  supervisorName: string;
  totalEmployees: number;
  currentMaintenances: number;
  completedMaintenances: number;
  upcomingMaintenances: number;
}

export interface AddDepartmentDto {
  supervisorId: number;
  name: string;
  mainPhoneNumber: string;
}
