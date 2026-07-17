import { useState } from "react";

import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import { Section } from "@/components/sections/Section";

import { Button } from "@/components/common/Button";
import { exportDatabase } from "@/features/data/export/export.service";
import { useTheme } from "@/hooks/use-theme";

export default function ExportScreen() {
  const { spacing } = useTheme();
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    try {
      setLoading(true);

      await exportDatabase();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AppHeader canGoBack title="Export Data" />

      <Screen>
        <Section title="Export" omitMagin>
          <Text>Export all application data to a JSON file.</Text>
          <Button
            style={{ marginTop: spacing.lg }}
            title="Export"
            loading={loading}
            onPress={handleExport}
          />
        </Section>
      </Screen>
    </>
  );
}
