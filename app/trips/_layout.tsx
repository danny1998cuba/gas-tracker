import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function Layout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerShown: false,
      }}
    />
  );
}
