import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const settings = sqliteTable("settings", {
  id: text().primaryKey(),

  currency: text().notNull().default("CAD"),

  defaultPayerCount: integer().notNull().default(1),

  ownerName: text(),

  createdAt: integer({
    mode: "timestamp",
  }).notNull(),
});
