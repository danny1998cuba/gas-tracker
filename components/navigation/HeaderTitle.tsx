import { StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;

  subtitle?: string;
};

export function HeaderTitle({ title, subtitle }: Props) {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        numberOfLines={1}
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: typography.heading,
          },
        ]}
      >
        {title}
      </Text>

      {subtitle && (
        <Text type="textSecondary" numberOfLines={1} style={[styles.subtitle]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },

  title: {
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 2,

    fontSize: 13,
  },
});
