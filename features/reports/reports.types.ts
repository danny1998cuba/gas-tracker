export type ReportFilters = {
  driverId?: string;
  from?: Date;
  to?: Date;
};

export type SummaryReport = {
  trips: number;
  distanceKm: number;
  litersConsumed: number;
  totalCost: number;
  amountOwed: number;
};

export type DriverReport = {
  driverId: string;
  driverName: string;
  trips: number;
  distanceKm: number;
  litersConsumed: number;
  totalCost: number;
  amountOwed: number;
};

export type VehicleReport = {
  vehicleId: string;
  vehicleName: string;
  trips: number;
  distanceKm: number;
  litersConsumed: number;
  totalCost: number;
};

export type ReportsResult = {
  summary: SummaryReport;
  drivers: DriverReport[];
  vehicles: VehicleReport[];
};
