import { TripSummary } from "@/modules/trip.module";

export function calculateTripSummary(
  distanceKm: number,
  fuelEfficiency: number,
  gasPricePerLiter: number,
  payerCount: number,
): TripSummary {
  const litersConsumed = (distanceKm * fuelEfficiency) / 100;

  const totalCost = litersConsumed * gasPricePerLiter;

  const amountOwed = totalCost / payerCount;

  return {
    litersConsumed,
    totalCost,
    amountOwed,
    costPerKm: totalCost / distanceKm,
    costPerPassenger: totalCost / payerCount,
    fuelEfficiency,
    payerCount,
  };
}
