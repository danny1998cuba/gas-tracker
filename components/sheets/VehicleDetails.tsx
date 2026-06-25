import { ScrollView, View } from "react-native";

import { Text } from "../common/ThemedText";
import { SheetHeader } from "./SheetHeader";

type Props = {
  id?: string;
};

export function VehicleDetails({ id }: Props) {
  if (!id) return null;

  return (
    <View style={{ flex: 1 }}>
      <SheetHeader title="Vehicle Details" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text>Vehicle Name</Text>

        <Text>Fuel Efficiency</Text>

        <Text>Total Distance</Text>

        <Text>Total Cost</Text>
      </ScrollView>
    </View>
  );
}
