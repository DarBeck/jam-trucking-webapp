export interface AddMaintenanceDto {
  truckId: number;
  mechanicId: number;
  description: string;
  cost: number;
  type: string;
  priority: string;
  minimumSkillLevelRequired: string;
  serviceDate: string;
}

export interface Maintenance {
  truckId: number;
  truckLicense: number;
  departmentId: number;
  supervisorId: number;
  mechanicId: number;
  type: string;
  priority: string;
  minimumSkillLevelRequired: string;
  description: string;
  truckMake: string;
  truckModel: string;
  mechanicName: string;
  mechanicSkillLevel: string;
  departmentName: string;
  supervisorName: string;
  cost: number;
  serviceDate: string;
  dateCreated: string;
}
