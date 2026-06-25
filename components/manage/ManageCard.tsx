import { ChevronRight } from "lucide-react-native";

import { Pressable, View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;

  count: number;

  onPress: () => void;
};

export function ManageCard({
  title,

  count,

  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          borderWidth: 1,

          borderRadius: 16,

          padding: 20,

          marginBottom: 12,

          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "700",
            }}
          >
            {title}
          </Text>

          <Text>{count}</Text>
        </View>

        <ChevronRight />
      </View>
    </Pressable>
  );
}
