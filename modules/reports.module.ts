import { useQuery } from "@tanstack/react-query";

import { calculateTripSummary } from "@/utils/calculate-trip-cost";

import {
  DriverReport,
  ReportFilters,
  ReportsResult,
  VehicleReport,
} from "@/features/reports/reports.types";
import { queryKeys } from "@/lib/query/query-keys";
import { repository } from "./trip.module";

const service = {
  async getReports(filters: ReportFilters): Promise<ReportsResult> {
    const trips = await repository.findAll(filters);

    const drivers = new Map<string, DriverReport>();

    const vehicles = new Map<string, VehicleReport>();

    let summary: ReportsResult["summary"] = {
      trips: 0,

      distanceKm: 0,

      litersConsumed: 0,

      totalCost: 0,

      amountOwed: 0,
    };

    for (const trip of trips) {
      const values = calculateTripSummary(
        trip.distanceKm,
        trip.vehicle.fuelEfficiency,
        trip.gasPricePerLiter,
        trip.payerCount,
      );

      summary.trips++;

      summary.distanceKm += trip.distanceKm;

      summary.litersConsumed += values.litersConsumed;

      summary.totalCost += values.totalCost;

      summary.amountOwed += values.amountOwed;

      const driver = drivers.get(trip.driverId) ?? {
        driverId: trip.driverId,

        driverName: trip.driver.name,

        trips: 0,

        distanceKm: 0,

        litersConsumed: 0,

        totalCost: 0,

        amountOwed: 0,
      };

      driver.trips++;

      driver.distanceKm += trip.distanceKm;

      driver.litersConsumed += values.litersConsumed;

      driver.totalCost += values.totalCost;

      driver.amountOwed += values.amountOwed;

      drivers.set(driver.driverId, driver);

      const vehicle = vehicles.get(trip.vehicleId) ?? {
        vehicleId: trip.vehicleId,

        vehicleName: trip.vehicle.name,

        trips: 0,

        distanceKm: 0,

        litersConsumed: 0,

        totalCost: 0,
      };

      vehicle.trips++;

      vehicle.distanceKm += trip.distanceKm;

      vehicle.litersConsumed += values.litersConsumed;

      vehicle.totalCost += values.totalCost;

      vehicles.set(vehicle.vehicleId, vehicle);
    }

    return {
      summary,

      drivers: [...drivers.values()].sort(
        (a, b) => b.amountOwed - a.amountOwed,
      ),

      vehicles: [...vehicles.values()].sort(
        (a, b) => b.distanceKm - a.distanceKm,
      ),
    };
  },
};

export function useReports(filters: ReportFilters) {
  return useQuery({
    queryKey: [...queryKeys.reports, filters],

    queryFn: () => service.getReports(filters),
  });
}
