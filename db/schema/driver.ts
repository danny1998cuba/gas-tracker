import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { vehicles } from "./vehicle";

export const drivers = sqliteTable("drivers", {
  id: text().primaryKey(),

  name: text().notNull(),

  phone: text(),

  notes: text(),

  active: integer({ mode: "boolean" }).notNull().default(true),

  preferredVehicleId: text().references(() => vehicles.id),

  createdAt: integer({
    mode: "timestamp",
  }).notNull(),

  updatedAt: integer({
    mode: "timestamp",
  }).notNull(),
});
