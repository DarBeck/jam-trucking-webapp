export interface Truck {
  id: number;
  licenceNum: number;
  make: string;
  color: string;
  model: string;
  engineSize: number;
  maxCapacity: number;
  year: number;
  rentalPrice: number;
  dateCreated: string;
  maxHeight: number;
  seatCap: number;
  wheelNum: number;
  fuelType: string;
  type: string;
}

export interface AddTruckDto {
  type: string;
  make: string;
  color: string;
  model: string;
  engineSize: number;
  maxCapacity: number;
  year: number;
  rentalPrice: number;
  maxHeight: number;
  seatCap: number;
  wheelNum: number;
  fuelType: string;
  licenceNum: number;
}