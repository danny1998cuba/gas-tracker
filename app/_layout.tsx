import AppProviders from "@/lib/providers/AppProviders";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppProviders>
  );
}
