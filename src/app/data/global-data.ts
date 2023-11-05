export interface Option {
  value: string;
  title: string;
}

export const truckTypes: Option[] = [
  {
    value: 'MoverTruck',
    title: 'Mover Truck',
  },
  {
    value: 'CargoTruck',
    title: 'Cargo Truck',
  },
];