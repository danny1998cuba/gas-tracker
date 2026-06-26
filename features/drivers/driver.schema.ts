import { z } from "zod";

export const driverSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
  active: z.boolean(),
});

export type DriverFormData = z.infer<typeof driverSchema>;
