import { z } from "zod";

export const tripSchema = z.object({
  date: z.date(),

  driverId: z.string().min(1, "Driver is required"),

  vehicleId: z.string().min(1, "Vehicle is required"),

  distanceKm: z
    .number({
      error: "Distance is required",
    })
    .positive("Distance must be greater than zero"),

  gasPricePerLiter: z
    .number({
      error: "Gas price is required",
    })
    .positive(),

  payerCount: z
    .number({
      error: "Passengers is required",
    })
    .int()
    .min(1),

  notes: z.string().trim().optional().or(z.literal("")),
});

export type TripFormData = z.infer<typeof tripSchema>;
