import { Pressable, StyleSheet, View } from "react-native";

import { CarFront, ChevronRight } from "lucide-react-native";

import { Text } from "@/components/common/ThemedText";

import { useTheme } from "@/hooks/use-theme";
import { Vehicle } from "@/modules/vehicles.module";

type Props = {
  vehicle: Vehicle;

  onPress: () => void;
};

export function VehicleListItem({ vehicle, onPress }: Props) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: radius.lg,
          },
        ]}
      >
        <View
          style={{
            marginRight: spacing.md,
          }}
        >
          <CarFront color={colors.primary} size={24} />
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            {vehicle.name}
          </Text>

          {!!vehicle.brand && (
            <Text
              style={{
                color: colors.textSecondary,
              }}
            >
              {[vehicle.brand, vehicle.model].filter(Boolean).join(" ")}
            </Text>
          )}

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 4,
            }}
          >
            {vehicle.fuelEfficiency.toFixed(1)} L/100km
          </Text>
        </View>

        <ChevronRight color={colors.icon} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,

    flexDirection: "row",
    alignItems: "center",
  },
});
