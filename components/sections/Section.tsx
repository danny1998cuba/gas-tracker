import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = PropsWithChildren<{
  title: string;
  omitMagin?: boolean;
}>;

export function Section({ title, children, omitMagin = false }: Props) {
  const theme = useTheme();
  return (
    <View
      style={{
        marginTop: !omitMagin ? theme.spacing.xl : 0,
      }}
    >
      <Text
        style={{
          fontSize: theme.typography.section,
          fontWeight: "600",
          marginBottom: theme.spacing.md,
        }}
      >
        {title}
      </Text>

      {children}
    </View>
  );
}
