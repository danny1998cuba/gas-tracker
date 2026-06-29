import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
};

export default Layout;
