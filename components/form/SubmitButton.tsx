import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Text } from "@/components/common/ThemedText";

import { useTheme } from "@/hooks/use-theme";

type Props = {
  title: string;

  loading?: boolean;

  disabled?: boolean;

  onPress: () => void;

  style?: StyleProp<ViewStyle>;
} & Omit<PressableProps, "disabled" | "style">;

export function SubmitButton({
  title,
  loading,
  disabled,
  onPress,
  style,
  ...props
}: Props) {
  const { colors, radius } = useTheme();

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        style,
        {
          borderRadius: radius.md,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: disabled ? colors.border : colors.primary,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          type="background"
          style={{
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
