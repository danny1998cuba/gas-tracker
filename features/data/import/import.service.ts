import { db } from "@/db";
import { drivers, payments, preferences, trips, vehicles } from "@/db/schema";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { EXPORT_VERSION, ExportData } from "../export/export.types";

export async function importDatabase() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/json",
    multiple: false,
  });

  if (result.canceled) {
    return false;
  }

  const file = new File(result.assets[0].uri);
  await importBackupData(file.textSync());

  return true;
}

export async function importBackupData(json: string) {
  const data = JSON.parse(json) as ExportData;
  validateBackup(data);

  await db.transaction(async (tx) => {
    await tx.delete(trips);
    await tx.delete(payments);
    await tx.delete(drivers);
    await tx.delete(vehicles);
    await tx.delete(preferences);

    await tx.insert(preferences).values(data.preferences);

    if (data.vehicles.length) {
      await tx
        .insert(vehicles)
        .values(reviveDates(data.vehicles, ["createdAt", "updatedAt"]));
    }

    if (data.drivers.length) {
      await tx
        .insert(drivers)
        .values(reviveDates(data.drivers, ["createdAt", "updatedAt"]));
    }

    if (data.payments.length) {
      await tx
        .insert(payments)
        .values(reviveDates(data.payments, ["createdAt", "paymentDate"]));
    }

    if (data.trips.length) {
      await tx
        .insert(trips)
        .values(reviveDates(data.trips, ["createdAt", "updatedAt", "date"]));
    }
  });
}

function validateBackup(data: ExportData) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid backup.");
  }

  if (data.version !== EXPORT_VERSION) {
    throw new Error("Unsupported backup version.");
  }

  if (!Array.isArray(data.drivers)) {
    throw new Error("Drivers missing.");
  }

  if (!Array.isArray(data.vehicles)) {
    throw new Error("Vehicles missing.");
  }

  if (!Array.isArray(data.payments)) {
    throw new Error("Payments missing.");
  }

  if (!Array.isArray(data.trips)) {
    throw new Error("Trips missing.");
  }

  if (!data.preferences) {
    throw new Error("Preferences missing.");
  }
}

function reviveDates<T>(items: T[], keys: (keyof T)[]): T[] {
  return items.map((item) => ({
    ...item,
    ...Object.fromEntries(
      keys.map((key) => [
        key,
        item[key] ? new Date(item[key] as string) : item[key],
      ]),
    ),
  }));
}
