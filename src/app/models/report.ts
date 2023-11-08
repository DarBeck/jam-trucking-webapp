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
  license: number;
  total: number;
  year: number;
  month: number;
}
