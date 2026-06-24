import { integer, text } from "drizzle-orm/sqlite-core";

export const id = text().primaryKey();

export const createdAt = integer({
  mode: "timestamp",
});

export const updatedAt = integer({
  mode: "timestamp",
});
