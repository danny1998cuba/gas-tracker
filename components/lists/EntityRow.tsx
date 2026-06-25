import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

export function EntityRow({
  title,

  subtitle,

  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 18,
          borderBottomWidth: 1,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            {title}
          </Text>

          {subtitle && <Text>{subtitle}</Text>}
        </View>

        <ChevronRight />
      </View>
    </Pressable>
  );
}
