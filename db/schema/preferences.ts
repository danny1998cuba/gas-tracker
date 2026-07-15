import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const preferences = sqliteTable("preferences", {
  id: integer().primaryKey(),

  currency: text().notNull().default("CAD"),

  distanceUnit: text().notNull().default("km"),

  defaultGasPrice: integer().notNull().default(0),

  defaultPayerCount: integer().notNull().default(1),

  preloadPreferredVehicle: integer({
    mode: "boolean",
  })
    .notNull()
    .default(true),

  preloadLastTrip: integer({
    mode: "boolean",
  })
    .notNull()
    .default(true),

  defaultTripDate: text().notNull().default("today"),
});
