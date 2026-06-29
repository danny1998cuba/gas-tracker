import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ChevronRight } from "lucide-react-native";

import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import { FormField } from "./FormField";

type Props = PropsWithChildren<{
  label?: string;

  value?: string;

  placeholder?: string;

  error?: string;

  required?: boolean;

  helperText?: string;

  disabled?: boolean;

  onPress: () => void;

  rightIcon?: React.ReactNode;
}>;

export function PressField({
  label,

  value,

  placeholder,

  error,

  required,

  helperText,

  disabled,

  onPress,

  rightIcon,

  children,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <FormField
      label={label}
      error={error}
      required={required}
      helperText={helperText}
    >
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.field,
          {
            borderRadius: radius.md,

            borderColor: error ? colors.danger : colors.border,

            backgroundColor: disabled ? colors.background : colors.surface,

            padding: spacing.md,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {children ?? (
            <Text type={value ? "text" : "textMuted"}>
              {value ?? placeholder}
            </Text>
          )}
        </View>

        {rightIcon ?? <ChevronRight size={18} color={colors.icon} />}
      </Pressable>
    </FormField>
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: 48,

    borderWidth: 1,

    flexDirection: "row",

    alignItems: "center",
  },
});
