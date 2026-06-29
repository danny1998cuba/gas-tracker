import { router } from "expo-router";

import { StatCard } from "@/components/cards/StatCard";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { TripListItem } from "@/features/trips/components/TripListItem";

import { useTrips } from "@/modules/trip.module";

import { EmptyState } from "@/components/common/EmptyState";
import { useTheme } from "@/hooks/use-theme";
import { Plus } from "lucide-react-native";
import { useMemo } from "react";
import { FlatList, View } from "react-native";

export default function TripsScreen() {
  const { data = [], isPending } = useTrips();
  const { spacing } = useTheme();

  const stats = useMemo(() => {
    return {
      debt: data.reduce((sum, trip) => sum + trip.amountOwed, 0),
      trips: data.length,
    };
  }, [data]);

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
            gap: 12,
          }}
        >
          <StatCard title="Current debt" value={`$${stats.debt.toFixed(2)}`} />
          <StatCard title="Trips" value={`${stats.trips}`} />
        </View>

        <FlatList
          style={{
            marginTop: spacing.lg,
          }}
          data={data}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <EmptyState
              title="No trips yet"
              description="Register your first trip to see information"
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
