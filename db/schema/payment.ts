import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { drivers } from "./driver";

export const payments = sqliteTable("payments", {
  id: text().primaryKey(),

  driverId: text()
    .notNull()
    .references(() => drivers.id),

  amount: real().notNull(),

  paymentDate: integer({
    mode: "timestamp",
  }).notNull(),

  notes: text(),

  createdAt: integer({
    mode: "timestamp",
  }).notNull(),
});
