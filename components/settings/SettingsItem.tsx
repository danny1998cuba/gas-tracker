import { ChevronRight } from "lucide-react-native";

import { Pressable, View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;

  subtitle?: string;

  onPress?: () => void;
};

export function SettingsItem({
  title,

  subtitle,

  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          paddingVertical: 18,

          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "center",

          borderBottomWidth: 1,
        }}
      >
        <View>
          <Text>{title}</Text>

          {subtitle && <Text>{subtitle}</Text>}
        </View>

        <ChevronRight />
      </View>
    </Pressable>
  );
}
