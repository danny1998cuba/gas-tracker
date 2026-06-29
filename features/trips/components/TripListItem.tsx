import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import { TripWithSummary } from "@/modules/trip.module";
import { formatCurrency } from "@/utils/currency.utils";
import { formatDateTime } from "@/utils/date.utils";
import { Calendar, ChevronRight, Route, User } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  trip: TripWithSummary;
  onPress?(): void;
};

export function TripListItem({ trip, onPress }: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <Pressable onPress={onPress}>
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
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {trip.vehicle.name}
          </Text>

          <ChevronRight size={18} color={colors.icon} />
        </View>

        <InfoRow
          icon={<User size={16} color={colors.textSecondary} />}
          value={trip.driver.name}
        />

        <InfoRow
          icon={<Calendar size={16} color={colors.textSecondary} />}
          value={formatDateTime(trip.date)}
        />

        <InfoRow
          icon={<Route size={16} color={colors.textSecondary} />}
          value={`${trip.distanceKm.toFixed(1)} km`}
        />

        <View
          style={{
            marginTop: spacing.lg,

            paddingTop: spacing.md,

            borderTopWidth: StyleSheet.hairlineWidth,

            borderColor: colors.border,

            flexDirection: "row",

            justifyContent: "space-between",

            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
            }}
          >
            You owe
          </Text>

          <Text
            style={{
              fontSize: 18,

              fontWeight: "700",

              color: colors.success,
            }}
          >
            {formatCurrency(trip.amountOwed)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  value: string;
};

function InfoRow({ icon, value }: InfoRowProps) {
  const { spacing } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",

        alignItems: "center",

        marginTop: spacing.sm,
      }}
    >
      {icon}

      <Text
        type="textSecondary"
        style={{
          marginLeft: spacing.sm,
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

    marginBottom: 14,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },
});
