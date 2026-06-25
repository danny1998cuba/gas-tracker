import { useTheme } from "@/hooks/use-theme";
import { View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;

  value: string;
};

export function StatCard({
  title,

  value,
}: Props) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,

        minHeight: 110,

        padding: theme.spacing.lg,

        borderRadius: theme.radius.lg,

        borderWidth: 1,

        borderColor: theme.colors.border,

        backgroundColor: theme.colors.card,
        ...theme.elevation.card,
      }}
    >
      <Text
        type="textSecondary"
        style={{
          fontSize: theme.typography.caption,
        }}
      >
        {title}
      </Text>

      <Text
        type="primary"
        style={{
          marginTop: 12,
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>
    </View>
  );
}
