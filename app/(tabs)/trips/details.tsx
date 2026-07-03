import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { Pencil, Trash2 } from "lucide-react-native";

import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";

import { useTheme } from "@/hooks/use-theme";

import { useDeleteTrip, useTrip } from "@/modules/trip.module";

import DetailsFieldRow from "@/components/common/DetailsFieldRow";
import { Section } from "@/components/sections/Section";
import { TripSummaryCard } from "@/features/trips/components/TripSummaryCard";

export default function TripDetails() {
  const { colors, radius } = useTheme();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: trip, isPending } = useTrip(id);

  const deleteTrip = useDeleteTrip();

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (!trip) {
    return null;
  }

  return (
    <>
      <AppHeader
        title="Trip"
        canGoBack
        rightActions={[
          {
            icon: Pencil,

            onPress() {
              router.push({
                pathname: "/trips/editor",

                params: {
                  id,
                },
              });
            },
          },

          {
            icon: Trash2,

            color: colors.danger,

            onPress() {
              setConfirmOpen(true);
            },
          },
        ]}
      />

      <Screen scrollable>
        <Section title="Details" omitMagin>
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
            <DetailsFieldRow
              label="Date"
              value={trip.date.toLocaleDateString()}
            />

            <DetailsFieldRow label="Driver" value={trip.driver.name} />

            <DetailsFieldRow label="Vehicle" value={trip.vehicle.name} />

            <DetailsFieldRow
              label="Distance"
              value={`${trip.distanceKm.toFixed(1)} km`}
            />

            <DetailsFieldRow
              label="Gas price"
              value={`$${trip.gasPricePerLiter.toFixed(2)} / L`}
            />

            <DetailsFieldRow label="Passengers" value={`${trip.payerCount}`} />

            {!!trip.notes && (
              <DetailsFieldRow label="Notes" value={trip.notes} />
            )}
          </View>
        </Section>

        <Section title="Cost">
          <TripSummaryCard summary={trip} />
        </Section>
      </Screen>

      <ConfirmDialog
        visible={confirmOpen}
        title="Delete Trip"
        message="This trip will be permanently deleted."
        destructive
        confirmLabel="Delete"
        loading={deleteTrip.isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          await deleteTrip.mutateAsync(id);

          router.dismissTo("/trips");
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 20,
  },
});
