import { ScrollView, TextInput, View } from "react-native";

import { Text } from "../common/ThemedText";
import { SheetHeader } from "./SheetHeader";

type Props = {
  paymentId?: string;
};

export function PaymentEditor({ paymentId }: Props) {
  const isEdit = !!paymentId;

  return (
    <View style={{ flex: 1 }}>
      <SheetHeader title={isEdit ? "Edit Payment" : "New Payment"} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text>Amount</Text>

        <TextInput keyboardType="decimal-pad" />

        <Text
          style={{
            marginTop: 20,
          }}
        >
          Notes
        </Text>

        <TextInput multiline />
      </ScrollView>
    </View>
  );
}
