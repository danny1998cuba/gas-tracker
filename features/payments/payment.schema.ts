import { z } from "zod";

export const paymentSchema = z.object({
  driverId: z.string().min(1, "Driver is required"),

  amount: z
    .number({
      error: "Amount is required",
    })
    .positive("Amount must be greater than zero"),

  paymentDate: z.date(),

  notes: z.string().trim().optional().or(z.literal("")),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
