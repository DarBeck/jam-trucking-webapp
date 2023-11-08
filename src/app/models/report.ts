import { Truck } from "./truck";

export interface CompanyOverview {
  trucks: number;
  customers: number;
  rentals: number;
  revenue: number;
}

export interface CompanyRevenue {
  total: number;
  year: number;
  month: number;
}

export interface TruckRevenue {
  truck: Truck;
  revenue: number;
}

export interface TruckReport {
  trucks: TruckRevenue[];
  count: number;
}
