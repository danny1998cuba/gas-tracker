import { View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  label: string;
  value: string;
};

export function DashboardCard({ label, value }: Props) {
  return (
    <View
      style={{
        flex: 1,

        minHeight: 100,

        borderRadius: 16,

        padding: 20,

        borderWidth: 1,
      }}
    >
      <Text>{label}</Text>

      <Text
        style={{
          fontSize: 24,

          fontWeight: "700",

          marginTop: 8,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
