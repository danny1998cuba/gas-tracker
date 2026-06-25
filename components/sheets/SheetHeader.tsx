import { X } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;

  subtitle?: string;

  onClose?: () => void;
};

export function SheetHeader({ title, subtitle, onClose }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,

        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            style={{
              marginTop: 4,
              opacity: 0.7,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <Pressable onPress={onClose}>
        <X size={20} />
      </Pressable>
    </View>
  );
}
