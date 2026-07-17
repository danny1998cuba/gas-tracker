import { Modal, Pressable, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { Text } from "./ThemedText";

export type ActionSheetAction = {
  title: string;

  destructive?: boolean;

  disabled?: boolean;

  onPress(): void;
};

type Props = {
  visible: boolean;

  title?: string;

  onClose(): void;

  actions: ActionSheetAction[];
};

export function AppActionSheet({ visible, title, onClose, actions }: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              borderRadius: radius.lg,
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {title && (
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
                padding: spacing.lg,
              }}
            >
              {title}
            </Text>
          )}

          {actions.map((action) => (
            <Pressable
              key={action.title}
              disabled={action.disabled}
              onPress={() => {
                onClose();

                action.onPress();
              }}
              style={{
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.lg,
              }}
            >
              <Text
                style={{
                  color: action.destructive ? colors.danger : colors.text,
                }}
              >
                {action.title}
              </Text>
            </Pressable>
          ))}

          <Pressable
            onPress={onClose}
            style={{
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.45)",
  },

  sheet: {
    margin: 16,
    overflow: "hidden",
  },
});
