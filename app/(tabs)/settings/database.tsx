import { Alert } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { Section } from "@/components/sections/Section";

import { Button } from "@/components/common/Button";
import { Text } from "@/components/common/ThemedText";
import {
  useDatabaseInfo,
  useOptimizeDatabase,
} from "@/features/database/database.module";

export default function DatabaseScreen() {
  const { data } = useDatabaseInfo();
  const optimize = useOptimizeDatabase();

  return (
    <>
      <AppHeader canGoBack title="Database" />

      <Screen>
        <Section title="Statistics" omitMagin>
          <Text>Drivers: {data?.drivers ?? 0}</Text>

          <Text>Vehicles: {data?.vehicles ?? 0}</Text>

          <Text>Trips: {data?.trips ?? 0}</Text>

          <Text>Payments: {data?.payments ?? 0}</Text>

          <Text>Backups: {data?.backups ?? 0}</Text>
        </Section>

        <Section title="Maintenance">
          <Button
            loading={optimize.isPending}
            title="Optimize database"
            onPress={async () => {
              await optimize.mutateAsync();

              Alert.alert("Done", "Database optimized.");
            }}
          />
        </Section>
      </Screen>
    </>
  );
}
