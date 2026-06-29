import { z } from "zod";

export const vehicleSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),

  brand: z.string().trim().max(100).optional().or(z.literal("")),

  model: z.string().trim().max(100).optional().or(z.literal("")),

  plate: z.string().trim().max(20).optional().or(z.literal("")),

  year: z
    .number({
      error: "Year must be a number",
    })
    .int()
    .min(1900)
    .max(2100)
    .nullable(),

  fuelEfficiency: z
    .number({
      error: "Fuel efficiency is required",
    })
    .positive("Fuel efficiency must be greater than zero"),

  active: z.boolean(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
