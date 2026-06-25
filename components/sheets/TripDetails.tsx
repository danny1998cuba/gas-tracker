import { ScrollView, View } from "react-native";

import { Text } from "../common/ThemedText";
import { SheetHeader } from "./SheetHeader";

type Props = {
  id?: string;
};

export function TripDetails({ id }: Props) {
  if (!id) return null;

  return (
    <View style={{ flex: 1 }}>
      <SheetHeader title="Trip Details" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text>Date</Text>

        <Text>Driver</Text>

        <Text>Vehicle</Text>

        <Text>Distance</Text>

        <Text>Gas Price</Text>

        <Text>Liters Consumed</Text>

        <Text>Total Cost</Text>

        <Text>Amount Owed</Text>
      </ScrollView>
    </View>
  );
}
