import { ScrollView, TextInput, View } from "react-native";

import { Text } from "../common/ThemedText";
import { SheetHeader } from "./SheetHeader";

type Props = {
  driverId?: string;
};

export function DriverEditor({ driverId }: Props) {
  const isEdit = !!driverId;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SheetHeader title={isEdit ? "Edit Driver" : "New Driver"} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text>Name</Text>

        <TextInput placeholder="John Doe" />

        <Text
          style={{
            marginTop: 20,
          }}
        >
          Notes
        </Text>

        <TextInput multiline numberOfLines={4} />
      </ScrollView>
    </View>
  );
}
