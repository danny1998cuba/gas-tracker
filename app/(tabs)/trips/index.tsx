import { router } from "expo-router";

import { StatCard } from "@/components/cards/StatCard";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { TripListItem } from "@/features/trips/components/TripListItem";

import { useTrips, useTripsSummary } from "@/modules/trip.module";

import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";
import { getCurrentWeekRange } from "@/utils/date.utils";
import { Plus } from "lucide-react-native";
import { FlatList, View } from "react-native";

export default function TripsScreen() {
  const { from, to } = getCurrentWeekRange();

  const { data = [], isPending } = useTrips({ from, to });
  const { spacing, typography } = useTheme();

  const { data: summary } = useTripsSummary();

  return (
    <>
      <AppHeader
        title="Trips"
        rightActions={[
          {
            icon: Plus,
            disabled: isPending,
            onPress() {
              router.push("/trips/editor");
            },
          },
        ]}
      />

      <Screen>
        <View
          style={{
            marginTop: -spacing.xl,
            flexDirection: "row",
            gap: spacing.md,
          }}
        >
          <StatCard
            title="Current debt"
            value={`$${(summary?.debt ?? 0).toFixed(2)}`}
          />

          <StatCard title="Total trips" value={`${summary?.trips ?? 0}`} />
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: spacing.xl,
            paddingHorizontal: spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: typography.section,
            }}
          >
            Last 7 days
          </Text>

          <Button
            onPress={() => router.push("/trips/history")}
            title="View all"
            style={{ height: 35, paddingHorizontal: spacing.md }}
          />
        </View>

        <FlatList
          style={{
            marginTop: spacing.lg,
          }}
          data={data}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <EmptyState
              title="No trips this week"
              description="Create your first trip to start tracking fuel expenses."
              actions={[
                {
                  action() {
                    router.push("/trips/editor");
                  },
                  buttonText: "Create first trip",
                  buttonColor: "primary",
                  textVariant: "background",
                },
              ]}
            />
          )}
          renderItem={({ item }) => (
            <TripListItem
              trip={item}
              onPress={() =>
                router.push({
                  pathname: "/trips/details",
                  params: {
                    id: item.id,
                  },
                })
              }
            />
          )}
        />
      </Screen>
    </>
  );
}
