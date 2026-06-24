import { db } from "@/db";
import migrations from "@/drizzle/migrations";
import { queryClient } from "@/lib/query/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.error("Migration error:", error);
    return <ActivityIndicator />;
  }

  if (!success) {
    return <ActivityIndicator />;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
      </QueryClientProvider>
    </DatabaseProvider>
  );
}
