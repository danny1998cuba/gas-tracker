import { router } from "expo-router";

import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { MenuCard } from "@/components/cards/MenuCard";

export default function AdvancedScreen() {
  return (
    <>
      <AppHeader canGoBack title="Advanced" />

      <Screen>
        <MenuCard
          title="Database"
          subtitle="Statistics and maintenance"
          onPress={() => router.push("/settings/database")}
        />

        <MenuCard
          title="Reset Application"
          subtitle="Delete all application data"
          onPress={() => router.push("/settings/reset")}
        />
      </Screen>
    </>
  );
}
