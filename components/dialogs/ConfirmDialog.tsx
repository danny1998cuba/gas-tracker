import React from "react";

import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: colors.overlay,
          },
        ]}
      >
        <View
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surface,
              borderRadius: radius.lg,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            {title}
          </Text>

          <Text
            type="textSecondary"
            style={{
              marginTop: spacing.md,
            }}
          >
            {message}
          </Text>

          <View
            style={{
              marginTop: spacing.xl,
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: spacing.md,
            }}
          >
            <Pressable
              disabled={loading}
              onPress={onCancel}
              style={[
                styles.button,
                {
                  backgroundColor: colors.background,
                },
              ]}
            >
              <Text>{cancelLabel}</Text>
            </Pressable>

            <Pressable
              disabled={loading}
              onPress={onConfirm}
              style={[
                styles.button,
                {
                  backgroundColor: destructive ? colors.danger : colors.primary,
                },
              ]}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  type={destructive ? "primary" : "background"}
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {confirmLabel}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  dialog: {
    width: "100%",
    padding: 24,
  },

  button: {
    minWidth: 90,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
