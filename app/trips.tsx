import { StatCard } from "@/components/cards/StatCard";
import { FloatingActionButton } from "@/components/common/FloatingActionButton";
import { Screen } from "@/components/layout/Screen";
import { TripListItem } from "@/components/lists/TripListItem";
import { AppHeader } from "@/components/navigation/AppHeader";
import { Section } from "@/components/sections/Section";
import { useTrips } from "@/modules/trip.module";
import { useMemo } from "react";
import { View } from "react-native";

export default function TripsScreen() {
  const { data } = useTrips();

  const stats = useMemo(() => {
    const trips = data ?? [];

    const debt = trips.reduce(
      (acc, trip) => acc + trip.amountOwed,

      0,
    );

    return {
      debt,
      count: trips.length,
    };
  }, [data]);

  return (
    <>
      <AppHeader title="Trips" />
      <Screen>
        <View
          style={{
            flexDirection: "row",

            gap: 12,
          }}
        >
          <StatCard title="Current debt" value={`$${stats.debt.toFixed(2)}`} />
          <StatCard title="Trips" value={`${stats.count}`} />
        </View>

        <Section title="Recent trips">
          {(data ?? []).map((trip) => (
            <TripListItem key={trip.id} trip={trip} />
          ))}
        </Section>

        <FloatingActionButton
          onPress={() => {
            //
          }}
        />
      </Screen>
    </>
  );
}
