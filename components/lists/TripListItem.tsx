import { useTheme } from "@/hooks/use-theme";
import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  trip: {
    id: string;

    date: Date;

    distanceKm: number;

    amountOwed: number;

    driver?: {
      name: string;
    };

    vehicle?: {
      name: string;
    };
  };

  onPress?: (id: string) => void;
};

export function TripListItem({
  trip,

  onPress,
}: Props) {
  const theme = useTheme();

  return (
    <Pressable onPress={() => onPress?.(trip.id)}>
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "center",

          borderWidth: 1,

          borderColor: theme.colors.border,

          borderRadius: theme.radius.lg,

          padding: theme.spacing.lg,

          backgroundColor: theme.colors.card,

          marginBottom: theme.spacing.md,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
            }}
          >
            {trip.driver?.name ?? "Unknown"}
          </Text>

          <Text
            style={{
              marginTop: 2,
            }}
          >
            {trip.vehicle?.name ?? "Unknown"}
          </Text>

          <Text
            type="textSecondary"
            style={{
              marginTop: 2,
            }}
          >
            {trip.distanceKm} km
          </Text>
        </View>

        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontWeight: "700",

              fontSize: 18,
            }}
          >
            ${trip.amountOwed.toFixed(2)}
          </Text>

          <ChevronRight size={18} />
        </View>
      </View>
    </Pressable>
  );
}
