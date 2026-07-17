import { Directory, File, Paths } from "expo-file-system";

import { buildExportData } from "../export/export.service";
import { importBackupData } from "../import/import.service";
import { BackupFile } from "./backup.types";

import * as Sharing from "expo-sharing";

const directory = new Directory(Paths.document, "backups");

directory.create({
  idempotent: true,
  intermediates: true,
});

export async function createBackup() {
  const data = await buildExportData();

  const file = new File(
    directory,
    `backup-${new Date().toISOString().replace(/:/g, "-")}.json`,
  );

  file.write(JSON.stringify(data, null, 2));

  return file;
}

export function getBackups(): BackupFile[] {
  return directory
    .list()
    .map((file) => ({
      name: file.name,
      uri: file.uri,
      createdAt: new Date(file.info().creationTime ?? Date.now()),
      size: file.size ?? 0,
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function restoreBackup(uri: string) {
  const file = new File(uri);

  const json = file.textSync();

  await importBackupData(json);
}

export async function deleteBackup(uri: string) {
  new File(uri).delete();
}

export async function shareBackup(uri: string) {
  if (!(await Sharing.isAvailableAsync())) {
    return;
  }

  await Sharing.shareAsync(uri);
}
