import { useState } from "react";

import { router } from "expo-router";

import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { Text } from "@/components/common/ThemedText";
import { Section } from "@/components/sections/Section";

import { queryClient } from "@/lib/query/query-client";

import { Button } from "@/components/common/Button";
import { importDatabase } from "@/features/data/import/import.service";
import { useTheme } from "@/hooks/use-theme";
import { Alert } from "react-native";

export default function ImportScreen() {
  const { spacing } = useTheme();
  const [loading, setLoading] = useState(false);

  async function handleImport() {
    Alert.alert("Replace data", "Current data will be permanently replaced.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Import",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);

            const imported = await importDatabase();

            if (!imported) {
              return;
            }

            await queryClient.invalidateQueries();
            Alert.alert(
              "Replace data",
              "The data has been successfully imported",
            );

            router.back();
          } catch (e) {
            Alert.alert(
              "Import failed",
              e instanceof Error ? e.message : "Unknown error",
            );
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  }

  return (
    <>
      <AppHeader canGoBack title="Import Data" />

      <Screen>
        <Section title="Import" omitMagin>
          <Text>
            Import a previously exported backup. Existing data will be replaced.
          </Text>

          <Button
            style={{ marginTop: spacing.lg }}
            loading={loading}
            title="Import"
            onPress={handleImport}
          />
        </Section>
      </Screen>
    </>
  );
}
