import { db } from "@/db";
import migrations from "@/drizzle/migrations";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { PropsWithChildren } from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "../query/query-client";

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

const AppProviders = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <DatabaseProvider>
        <SafeAreaProvider>
          <KeyboardProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </DatabaseProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
