import type { drivers, payments, trips, vehicles } from "./schema";

export type Driver = typeof drivers.$inferSelect;

export type Vehicle = typeof vehicles.$inferSelect;

export type Trip = typeof trips.$inferSelect;

export type Payment = typeof payments.$inferSelect;
