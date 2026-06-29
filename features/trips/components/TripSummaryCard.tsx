import { StyleSheet, View } from "react-native";

import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import { TripSummary } from "@/modules/trip.module";
import { formatCurrency } from "@/utils/currency.utils";

type Props = {
  summary: TripSummary;
};

export function TripSummaryCard({ summary }: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,

          borderColor: colors.border,

          borderRadius: radius.lg,

          padding: spacing.lg,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",

          marginBottom: spacing.lg,
        }}
      >
        Trip Summary
      </Text>

      <SummaryRow
        label="Fuel efficiency"
        value={`${summary.fuelEfficiency.toFixed(1)} L/100 km`}
      />

      <SummaryRow
        label="Fuel consumed"
        value={`${summary.litersConsumed.toFixed(2)} L`}
      />

      <SummaryRow label="Fuel cost" value={formatCurrency(summary.totalCost)} />

      <SummaryRow label="Passengers" value={`${summary.payerCount}`} />

      <View
        style={{
          marginVertical: spacing.md,

          borderBottomWidth: StyleSheet.hairlineWidth,

          borderColor: colors.border,
        }}
      />

      <SummaryRow
        highlight
        label="Amount owed"
        value={formatCurrency(summary.amountOwed)}
      />
    </View>
  );
}

type SummaryRowProps = {
  label: string;

  value: string;

  highlight?: boolean;
};

function SummaryRow({ label, value, highlight }: SummaryRowProps) {
  const { spacing } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: spacing.md,
      }}
    >
      <Text type="textSecondary">{label}</Text>

      <Text
        type={highlight ? "success" : "text"}
        style={{
          fontWeight: highlight ? "700" : "600",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
});
