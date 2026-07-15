import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import { LucideIcon } from "lucide-react-native";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type Props = {
  title: string;

  loading?: boolean;

  disabled?: boolean;

  variant?: Variant;

  leftIcon?: LucideIcon;

  rightIcon?: LucideIcon;

  style?: StyleProp<ViewStyle>;
} & Omit<PressableProps, "style" | "disabled">;

export function Button({
  title,
  loading,
  disabled,
  variant = "primary",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  style,
  ...props
}: Props) {
  const { colors, spacing, radius } = useTheme();

  const backgroundColor = (() => {
    switch (variant) {
      case "secondary":
        return colors.textSecondary;

      case "outline":
      case "ghost":
        return "transparent";

      case "danger":
        return colors.danger;

      default:
        return colors.primary;
    }
  })();

  const borderColor = (() => {
    switch (variant) {
      case "outline":
        return colors.border;

      case "danger":
        return colors.danger;

      default:
        return "transparent";
    }
  })();

  const textColor = (() => {
    switch (variant) {
      case "outline":
      case "ghost":
        return colors.text;

      default:
        return colors.background;
    }
  })();

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={[
        {
          height: 48,

          flexDirection: "row",

          alignItems: "center",

          justifyContent: "center",

          gap: spacing.sm,

          borderRadius: radius.md,

          borderWidth: variant === "outline" ? 1 : 0,

          borderColor,

          backgroundColor: disabled ? colors.border : backgroundColor,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {LeftIcon && <LeftIcon color={textColor} />}

          <Text
            style={{
              color: textColor,

              fontWeight: "600",
            }}
          >
            {title}
          </Text>

          {RightIcon && <RightIcon color={textColor} />}
        </>
      )}
    </Pressable>
  );
}
