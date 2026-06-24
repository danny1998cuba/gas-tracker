import { relations } from "drizzle-orm";
import { drivers } from "./driver";
import { payments } from "./payment";
import { trips } from "./trip";
import { vehicles } from "./vehicle";

export const driversRelations = relations(drivers, ({ many }) => ({
  trips: many(trips),

  payments: many(payments),
}));

export const vehiclesRelations = relations(vehicles, ({ many }) => ({
  trips: many(trips),
}));

export const tripsRelations = relations(trips, ({ one }) => ({
  driver: one(drivers, {
    fields: [trips.driverId],
    references: [drivers.id],
  }),

  vehicle: one(vehicles, {
    fields: [trips.vehicleId],
    references: [vehicles.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  driver: one(drivers, {
    fields: [payments.driverId],
    references: [drivers.id],
  }),
}));
