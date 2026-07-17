import { sql } from "drizzle-orm";

import { db } from "@/db";

import { drivers, payments, trips, vehicles } from "@/db/schema";

import { Directory, Paths } from "expo-file-system";

export type DatabaseInfo = {
  drivers: number;

  vehicles: number;

  trips: number;

  payments: number;

  backups: number;
};

const backupDirectory = new Directory(Paths.document, "backups");

backupDirectory.create({
  idempotent: true,
  intermediates: true,
});

export async function getDatabaseInfo(): Promise<DatabaseInfo> {
  const [driverCount, vehicleCount, tripCount, paymentCount] =
    await Promise.all([
      db.$count(drivers),
      db.$count(vehicles),
      db.$count(trips),
      db.$count(payments),
    ]);

  return {
    drivers: driverCount,
    vehicles: vehicleCount,
    trips: tripCount,
    payments: paymentCount,
    backups: backupDirectory.list().length,
  };
}

export async function optimizeDatabase() {
  await db.run(sql.raw("VACUUM"));
  await db.run(sql.raw("ANALYZE"));
}
