import { PropsWithChildren } from "react";
import { View } from "react-native";

import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";

type Props = PropsWithChildren<{
  label: string;
  description?: string;
}>;

export function FormRow({ label, description, children }: Props) {
  const { spacing } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: spacing.lg,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingRight: spacing.md,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
          }}
        >
          {label}
        </Text>

        {description && (
          <Text
            type="textSecondary"
            style={{
              marginTop: 2,
            }}
          >
            {description}
          </Text>
        )}
      </View>

      {children}
    </View>
  );
}
