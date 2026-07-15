import { z } from "zod";

export const preferencesSchema = z.object({
  currency: z.string(),

  distanceUnit: z.enum(["km", "mi"]),

  defaultGasPrice: z.number().positive(),

  defaultPayerCount: z.number().int().min(1),

  preloadPreferredVehicle: z.boolean(),

  preloadLastTrip: z.boolean(),

  defaultTripDate: z.enum(["today", "last"]),
});

export type PreferencesFormData = z.infer<typeof preferencesSchema>;
