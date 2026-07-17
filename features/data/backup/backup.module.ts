import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBackup,
  deleteBackup,
  getBackups,
  restoreBackup,
  shareBackup,
} from "./backup.service";

const queryKey = ["backups"];

export function useBackups() {
  return useQuery({
    queryKey,
    queryFn: getBackups,
  });
}

export function useCreateBackup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createBackup,

    async onSuccess() {
      await qc.invalidateQueries({
        queryKey,
      });
    },
  });
}

export function useRestoreBackup() {
  return useMutation({
    mutationFn: restoreBackup,
  });
}

export function useDeleteBackup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteBackup,

    async onSuccess() {
      await qc.invalidateQueries({
        queryKey,
      });
    },
  });
}

export function useShareBackup() {
  return useMutation({
    mutationFn: shareBackup,
  });
}
