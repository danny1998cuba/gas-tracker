import { useMemo, useState } from "react";

import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { Check, Search, X } from "lucide-react-native";

import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";

export type PickerOption = {
  label: string;
  value: string;
};

type Props = {
  visible: boolean;

  title: string;

  value?: string;

  options: PickerOption[];

  searchable?: boolean;

  onClose(): void;

  onSelect(value: string): void;
};

export function AppPicker({
  visible,
  title,
  value,
  options,
  searchable = true,
  onClose,
  onSelect,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return options;

    return options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={[
          styles.overlay,
          {
            backgroundColor: "rgba(0,0,0,.45)",
          },
        ]}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surface,
              borderRadius: radius.lg,
              maxHeight: "80%",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              justifyContent: "space-between",

              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,

              borderBottomWidth: StyleSheet.hairlineWidth,

              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              {title}
            </Text>

            <Pressable onPress={onClose}>
              <X color={colors.icon} />
            </Pressable>
          </View>

          {searchable && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                margin: spacing.lg,

                borderWidth: 1,

                borderColor: colors.border,

                borderRadius: radius.md,

                paddingHorizontal: spacing.md,
              }}
            >
              <Search size={18} color={colors.icon} />

              <TextInput
                placeholder="Search..."
                placeholderTextColor={colors.textMuted}
                style={{
                  flex: 1,

                  height: 44,

                  marginLeft: spacing.sm,

                  color: colors.text,
                }}
                value={query}
                onChangeText={setQuery}
              />
            </View>
          )}

          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filtered}
            keyExtractor={(i) => i.value}
            renderItem={({ item }) => {
              const selected = item.value === value;

              return (
                <Pressable
                  onPress={() => {
                    onSelect(item.value);

                    onClose();
                  }}
                  style={{
                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent: "space-between",

                    paddingHorizontal: spacing.lg,

                    paddingVertical: spacing.md,
                  }}
                >
                  <Text>{item.label}</Text>

                  {selected && <Check color={colors.primary} />}
                </Pressable>
              );
            }}
          />
        </Pressable>
      </Pressable>
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
});
