import { ScrollView, View } from "react-native";

import { Text } from "../common/ThemedText";
import { SheetHeader } from "./SheetHeader";

type Props = {
  id?: string;
};

export function DriverDetails({ id }: Props) {
  if (!id) return null;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SheetHeader title="Driver Details" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          Driver Name
        </Text>

        <Text>Total debt</Text>

        <Text>Total paid</Text>

        <Text>Balance</Text>

        <View
          style={{
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
            }}
          >
            Trips
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
