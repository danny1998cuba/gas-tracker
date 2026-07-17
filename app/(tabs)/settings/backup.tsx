import { Alert, FlatList } from "react-native";

import { Plus } from "lucide-react-native";

import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { EmptyState } from "@/components/common/EmptyState";

import { BackupListItem } from "@/features/data/backup/components/BackupListItem";

import {
  useBackups,
  useCreateBackup,
  useDeleteBackup,
  useRestoreBackup,
  useShareBackup,
} from "@/features/data/backup/backup.module";

import { AppActionSheet } from "@/components/common/AppActionSheet";
import { Text } from "@/components/common/ThemedText";
import { BackupFile } from "@/features/data/backup/backup.types";
import { useTheme } from "@/hooks/use-theme";
import { queryClient } from "@/lib/query/query-client";
import { reloadApp } from "@/utils/reload-app";
import { router } from "expo-router";
import { useState } from "react";

export default function BackupScreen() {
  const { spacing } = useTheme();

  const { data: backups = [] } = useBackups();
  const [selected, setSelected] = useState<BackupFile | null>(null);

  const createBackup = useCreateBackup();
  const restoreBackup = useRestoreBackup();
  const shareBackup = useShareBackup();
  const deleteBackup = useDeleteBackup();

  const totalSize = backups.reduce((sum, backup) => sum + backup.size, 0);

  return (
    <>
      <AppHeader
        canGoBack
        title="Backups"
        rightActions={[
          {
            icon: Plus,

            loading: createBackup.isPending,

            async onPress() {
              await createBackup.mutateAsync();
              Alert.alert("Saved locally", "Backup created successfully");
            },
          },
        ]}
      />

      <Screen>
        <Text style={{ textAlign: "center", marginBottom: spacing.xl }}>
          {backups.length} backups - Total size: {totalSize} KB
        </Text>

        <FlatList
          data={backups}
          keyExtractor={(item) => item.uri}
          ListEmptyComponent={
            <EmptyState
              title="No backups"
              description="Create your first backup."
            />
          }
          renderItem={({ item }) => (
            <BackupListItem backup={item} onPress={() => setSelected(item)} />
          )}
        />
      </Screen>

      <AppActionSheet
        visible={!!selected}
        title={selected?.name}
        onClose={() => setSelected(null)}
        actions={
          selected
            ? [
                {
                  title: "Restore",

                  onPress: async () => {
                    await restoreBackup.mutateAsync(selected.uri);
                    queryClient.clear();
                    await reloadApp();
                    router.back();
                  },
                },

                {
                  title: "Share",

                  onPress: () => shareBackup.mutate(selected.uri),
                },

                {
                  title: "Delete",

                  destructive: true,

                  onPress: () => deleteBackup.mutate(selected.uri),
                },
              ]
            : []
        }
      />
    </>
  );
}
