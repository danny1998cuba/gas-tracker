import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}>;

export function FormField({
  label,
  required,
  error,
  helperText,
  children,
}: Props) {
  const { spacing, typography } = useTheme();

  return (
    <View
      style={{
        marginBottom: spacing.xl,
      }}
    >
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

      <View
        style={{
          marginTop: 6,
        }}
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
