import { View } from "react-native";

import { Button } from "@/components/common/Button";
import DetailsFieldRow from "@/components/common/DetailsFieldRow";
import { Text } from "@/components/common/ThemedText";

import { useTheme } from "@/hooks/use-theme";

import { DriverTripSummary } from "@/modules/trip.module";

type Props = {
  summary: DriverTripSummary;

  onPressHistory(): void;
};

export function DriverTripSummaryCard({ summary, onPressHistory }: Props) {
  const { colors, radius } = useTheme();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 16,
        }}
      >
        Trip Summary
      </Text>

      <DetailsFieldRow label="Trips" value={`${summary.trips}`} />

      <DetailsFieldRow
        label="Distance"
        value={`${summary.distanceKm.toFixed(1)} km`}
      />

      <DetailsFieldRow
        label="Total Cost"
        value={`$${summary.totalCost.toFixed(2)}`}
      />

      <DetailsFieldRow
        label="Current Debt"
        value={`$${summary.amountOwed.toFixed(2)}`}
      />

      <Button title="View trip history" onPress={onPressHistory} />
    </View>
  );
}
