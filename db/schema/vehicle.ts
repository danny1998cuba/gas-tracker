import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const vehicles = sqliteTable("vehicles", {
  id: text().primaryKey(),

  name: text().notNull(),

  brand: text(),

  model: text(),

  year: integer(),

  plate: text(),

  fuelEfficiency: real().notNull(),

  active: integer({ mode: "boolean" }).notNull().default(true),

  createdAt: integer({
    mode: "timestamp",
  }).notNull(),

  updatedAt: integer({
    mode: "timestamp",
  }).notNull(),
});
