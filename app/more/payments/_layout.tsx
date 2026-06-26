import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const { colors, radius } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="details"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.25, 0.5, 0.75],
          sheetGrabberVisible: true,
          sheetCornerRadius: radius.lg,
          contentStyle: { backgroundColor: colors.surface },
        }}
      />
      <Stack.Screen
        name="editor"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.25, 0.5, 0.75],
          sheetGrabberVisible: true,
          sheetCornerRadius: radius.lg,
          contentStyle: { backgroundColor: colors.surface },
        }}
      />
    </Stack>
  );
};

export default Layout;
