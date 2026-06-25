import { ScrollView, View } from "react-native";

import { Text } from "../common/ThemedText";
import { SheetHeader } from "./SheetHeader";

type Props = {
  id?: string;
};

export function PaymentDetails({ id }: Props) {
  if (!id) return null;

  return (
    <View style={{ flex: 1 }}>
      <SheetHeader title="Payment Details" />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text>Driver</Text>

        <Text>Amount</Text>

        <Text>Date</Text>

        <Text>Notes</Text>
      </ScrollView>
    </View>
  );
}
