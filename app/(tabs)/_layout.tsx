import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useTheme } from "@/hooks/use-theme";
import { useThemeMode } from "@/lib/providers/ColorSchemeProvider";
import { ChartColumn, Ellipsis, Route, Settings } from "lucide-react-native";

export default function RootLayout() {
  const { colors } = useTheme();
  const { colorScheme } = useThemeMode();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: colors.tabIconDefault,
          tabBarActiveTintColor: colors.tabIconSelected,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },

          sceneStyle: {
            backgroundColor: colors.background,
          },

          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="trips"
          options={{
            title: "Trips",
            popToTopOnBlur: true,
            tabBarIcon: ({ color, size }) => (
              <Route color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="reports"
          options={{
            title: "Reports",

            tabBarIcon: ({ color, size }) => (
              <ChartColumn color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            popToTopOnBlur: true,
            tabBarIcon: ({ color, size }) => (
              <Ellipsis color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            popToTopOnBlur: true,

            tabBarIcon: ({ color, size }) => (
              <Settings color={color} size={size} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
}
