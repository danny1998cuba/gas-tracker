import { View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;

  subtitle?: string;
};

export function ScreenHeader({
  title,

  subtitle,
}: Props) {
  return (
    <View
      style={{
        marginBottom: 28,
      }}
    >
      <Text
        style={{
          fontSize: 32,

          fontWeight: "700",
        }}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={{
            marginTop: 6,

            opacity: 0.7,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
