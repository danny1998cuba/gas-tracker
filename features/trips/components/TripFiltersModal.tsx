import { Modal, Pressable, StyleSheet, View } from "react-native";

import { X } from "lucide-react-native";

import { Text } from "@/components/common/ThemedText";

import { useTheme } from "@/hooks/use-theme";

import { TripFilters, TripFiltersValue } from "./TripFilters";

type Props = {
  visible: boolean;

  filters: TripFiltersValue;

  onClose(): void;

  onApply(filters: TripFiltersValue): void;

  lockedDriverId?: string;
};

export function TripFiltersModal({
  visible,

  filters,

  onClose,

  onApply,
  lockedDriverId,
}: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        style={[
          styles.overlay,
          {
            backgroundColor: "rgba(0,0,0,.45)",
          },
        ]}
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surface,

              borderRadius: radius.lg,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",

              justifyContent: "space-between",

              alignItems: "center",

              marginBottom: spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: 20,

                fontWeight: "700",
              }}
            >
              Filters
            </Text>

            <Pressable onPress={onClose}>
              <X color={colors.icon} />
            </Pressable>
          </View>

          <TripFilters
            defaultValues={filters}
            lockedDriverId={lockedDriverId}
            onApply={(value) => {
              onApply(value);

              onClose();
            }}
            onClear={() => {
              onApply({});

              onClose();
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

    padding: 24,
  },

  dialog: {
    padding: 24,
  },
});
