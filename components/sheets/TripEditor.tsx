import { ScrollView, TextInput, View } from "react-native";

import { Text } from "../common/ThemedText";
import { SheetHeader } from "./SheetHeader";

type Props = {
  tripId?: string;
};

export function TripEditor({ tripId }: Props) {
  const isEdit = !!tripId;

  return (
    <View style={{ flex: 1 }}>
      <SheetHeader title={isEdit ? "Edit Trip" : "New Trip"} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text>Date</Text>

        <TextInput />

        <Text
          style={{
            marginTop: 20,
          }}
        >
          Driver
        </Text>

        <TextInput />

        <Text
          style={{
            marginTop: 20,
          }}
        >
          Vehicle
        </Text>

        <TextInput />

        <Text
          style={{
            marginTop: 20,
          }}
        >
          Distance (km)
        </Text>

        <TextInput keyboardType="decimal-pad" />

        <Text
          style={{
            marginTop: 20,
          }}
        >
          Gas Price
        </Text>

        <TextInput keyboardType="decimal-pad" />
      </ScrollView>
    </View>
  );
}
