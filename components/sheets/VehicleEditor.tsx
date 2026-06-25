import { ScrollView, TextInput, View } from "react-native";

import { Text } from "../common/ThemedText";
import { SheetHeader } from "./SheetHeader";

type Props = {
  vehicleId?: string;
};

export function VehicleEditor({ vehicleId }: Props) {
  const isEdit = !!vehicleId;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SheetHeader title={isEdit ? "Edit Vehicle" : "New Vehicle"} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text>Name</Text>

        <TextInput placeholder="Toyota Corolla" />

        <Text
          style={{
            marginTop: 20,
          }}
        >
          Fuel Efficiency
        </Text>

        <TextInput placeholder="7.2" />
      </ScrollView>
    </View>
  );
}
