export function calculateTripCost(
  distanceKm: number,
  fuelEfficiency: number,
  gasPricePerLiter: number,
  payerCount: number,
) {
  const litersConsumed = (distanceKm * fuelEfficiency) / 100;

  const totalCost = litersConsumed * gasPricePerLiter;

  const amountOwed = totalCost / payerCount;

  return {
    litersConsumed,

    totalCost,

    amountOwed,
  };
}
