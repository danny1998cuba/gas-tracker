import type { LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/use-theme";

type Props = {
  icon: LucideIcon;

  onPress?: () => void;

  disabled?: boolean;

  color?: string;

  size?: number;

  style?: ViewStyle;
};

export function HeaderButton({
  icon: Icon,
  onPress,
  disabled,
  color,
  size = 22,
  style,
}: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={10}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: disabled ? 0.4 : pressed ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Icon size={size} color={color ?? colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 20,
  },
});
