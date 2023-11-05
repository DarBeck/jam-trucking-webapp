export interface Option {
  value: string;
  title: string;
}

export const truckTypes: Option[] = [
  {
    value: 'Mover',
    title: 'Mover Truck',
  },
  {
    value: 'Cargo',
    title: 'Cargo Truck',
  },
];

export const fuelTypes: Option[] = [
  {
    value: 'Gas',
    title: 'Gas',
  },
  {
    value: 'Electric',
    title: 'Electric',
  },
  {
    value: 'Diesel',
    title: 'Diesel',
  },
  {
    value: 'Biodiesel',
    title: 'Biodiesel',
  },
  {
    value: 'NaturalGas',
    title: 'Natural Gas',
  },
  {
    value: 'Hydrogen',
    title: 'Hydrogen',
  },
  {
    value: 'Ethanol',
    title: 'Ethanol',
  },
  {
    value: 'Propane',
    title: 'Propane',
  },
];