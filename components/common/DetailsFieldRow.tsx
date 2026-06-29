import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { View } from "react-native";
import { Text } from "./ThemedText";

function DetailsFieldRow({ label, value }: { label: string; value: string }) {
  const { spacing } = useTheme();

  return (
    <View
      style={{
        marginBottom: spacing.lg,
        flexDirection: "row",
        alignItems: "baseline",
        gap: spacing.sm,
      }}
    >
      <Text type="textSecondary">{label}:</Text>

      <Text
        style={{
          marginTop: 4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export default DetailsFieldRow;
