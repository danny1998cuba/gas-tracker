import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { drivers } from "./driver";
import { vehicles } from "./vehicle";

export const trips = sqliteTable("trips", {
  id: text().primaryKey(),

  date: integer({
    mode: "timestamp",
  }).notNull(),

  driverId: text()
    .notNull()
    .references(() => drivers.id),

  vehicleId: text()
    .notNull()
    .references(() => vehicles.id),

  distanceKm: real().notNull(),

  gasPricePerLiter: real().notNull(),

  payerCount: integer().notNull().default(1),

  notes: text(),

  createdAt: integer({
    mode: "timestamp",
  }).notNull(),

  updatedAt: integer({
    mode: "timestamp",
  }).notNull(),
});
