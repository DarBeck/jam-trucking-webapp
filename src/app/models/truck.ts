export interface Truck {
    
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
  license: number;
}