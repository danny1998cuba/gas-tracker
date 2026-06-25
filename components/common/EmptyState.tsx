import { View } from "react-native";
import { Text } from "./ThemedText";

type Props = {
  title: string;

  description: string;
};

export function EmptyState({
  title,

  description,
}: Props) {
  return (
    <View
      style={{
        alignItems: "center",

        justifyContent: "center",

        padding: 48,
      }}
    >
      <Text
        style={{
          fontSize: 22,

          fontWeight: "700",
        }}
      >
        {title}
      </Text>

      <Text
        type="textSecondary"
        style={{
          textAlign: "center",
          marginTop: 8,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
