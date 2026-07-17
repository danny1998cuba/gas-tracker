import { db } from "@/db";

import { drivers, payments, preferences, trips, vehicles } from "@/db/schema";

import { Directory, Paths } from "expo-file-system";

const backups = new Directory(Paths.document, "backups");

export async function resetApplication() {
  await db.transaction(async (tx) => {
    await tx.delete(trips);

    await tx.delete(payments);

    await tx.delete(drivers);

    await tx.delete(vehicles);

    await tx.delete(preferences);
  });

  backups.delete();
}
