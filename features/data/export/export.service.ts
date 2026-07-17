import * as Sharing from "expo-sharing";

import { Directory, File, Paths } from "expo-file-system";

import { db } from "@/db";

import { drivers } from "@/db/schema/driver";
import { payments } from "@/db/schema/payment";
import { trips } from "@/db/schema/trip";
import { vehicles } from "@/db/schema/vehicle";

import { EXPORT_VERSION, ExportData } from "./export.types";

export async function exportDatabase() {
  const data: ExportData = await buildExportData();

  const directory = new Directory(Paths.cache, "exports");

  directory.create({
    intermediates: true,
    idempotent: true,
  });

  const file = new File(
    directory,
    `GasTracker-${new Date().toISOString().slice(0, 10)}.json`,
  );

  file.write(JSON.stringify(data, null, 2));

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri);
  }

  return file.uri;
}

export async function buildExportData(): Promise<ExportData> {
  return {
    version: EXPORT_VERSION,
    createdAt: new Date().toISOString(),
    preferences: (await db.query.preferences.findFirst())!,
    drivers: await db.select().from(drivers),
    vehicles: await db.select().from(vehicles),
    payments: await db.select().from(payments),
    trips: await db.select().from(trips),
  };
}
