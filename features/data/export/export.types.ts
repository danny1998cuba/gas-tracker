import { Driver } from "@/modules/drivers.module";
import { Payment } from "@/modules/payments.module";
import { Preferences } from "@/modules/preferences.module";
import { Trip } from "@/modules/trip.module";
import { Vehicle } from "@/modules/vehicles.module";

export const EXPORT_VERSION = 1;

export type ExportData = {
  version: number;
  createdAt: string;
  preferences: Preferences;
  drivers: Driver[];
  vehicles: Vehicle[];
  payments: Payment[];
  trips: Trip[];
};
