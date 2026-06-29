import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  label?: string;
  required?: boolean;
  omitMargin?: boolean;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
}>;

export function FormField({
  label,
  required,
  error,
  helperText,
  children,
  containerStyle,
  omitMargin = false,
}: Props) {
  const { spacing, typography } = useTheme();

  return (
    <View
      style={{
        marginBottom: omitMargin ? undefined : spacing.xl,
      }}
    >
      {label && (
        <Text
          style={{
            fontWeight: "600",
            fontSize: typography.body,
          }}
        >
          {label}

          {required && (
            <View style={{ paddingStart: spacing.xs }}>
              <Text type="danger">*</Text>
            </View>
          )}
          {!required && (
            <View style={{ paddingStart: spacing.xs }}>
              <Text type="textMuted" style={{ fontSize: typography.overline }}>
                (optional)
              </Text>
            </View>
          )}
        </Text>
      )}

      <View
        style={[
          containerStyle,
          {
            marginTop: 6,
          },
        ]}
      >
        {children}
      </View>

      {!!error && (
        <Text type="danger" style={[styles.message]}>
          {error}
        </Text>
      )}

      {!error && helperText && (
        <Text type="textSecondary" style={[styles.message]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    marginTop: 6,
    fontSize: 13,
  },
});
