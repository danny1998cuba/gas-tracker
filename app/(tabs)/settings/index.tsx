import { router } from "expo-router";

import { MenuCard } from "@/components/cards/MenuCard";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import { Section } from "@/components/sections/Section";

export default function SettingsScreen() {
  return (
    <>
      <AppHeader title="Settings" />

      <Screen scrollable>
        <Section title="General" omitMagin>
          <MenuCard
            title="Preferences"
            subtitle="Units, defaults and behavior"
            onPress={() => router.push("/settings/preferences")}
          />

          <MenuCard
            title="Appearance"
            subtitle="Theme and display"
            onPress={() => router.push("/settings/appearance")}
          />
        </Section>

        <Section title="Data">
          <MenuCard
            title="Export Data"
            subtitle="Share all application data"
            onPress={() => router.push("/settings/export")}
          />

          <MenuCard
            title="Import Data"
            subtitle="Restore data from a backup"
            onPress={() => router.push("/settings/import")}
          />

          <MenuCard
            title="Backup"
            subtitle="Create or restore local backups"
            onPress={() => router.push("/settings/backup")}
          />
        </Section>

        <Section title="Advanced">
          <MenuCard
            title="Advanced"
            subtitle="Maintenance and diagnostics"
            onPress={() => router.push("/settings/advanced")}
          />
        </Section>
      </Screen>
    </>
  );
}
