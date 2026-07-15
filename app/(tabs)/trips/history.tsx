import { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

import { router } from "expo-router";

import { EmptyState } from "@/components/common/EmptyState";

import { AppHeader } from "@/components/navigation/AppHeader";

import { TripListItem } from "@/features/trips/components/TripListItem";

import { useTrips } from "@/modules/trip.module";

import { TripFiltersValue } from "@/features/trips/components/TripFilters";
import { TripFiltersModal } from "@/features/trips/components/TripFiltersModal";
import { useTheme } from "@/hooks/use-theme";
import { Funnel } from "lucide-react-native";

export default function TripHistoryScreen() {
  const { spacing } = useTheme();
  const [filters, setFilters] = useState<TripFiltersValue>({});

  const [open, setOpen] = useState(false);

  const { data = [], isPending } = useTrips(filters);

  return (
    <>
      <AppHeader
        canGoBack
        title="All Trips"
        rightActions={[
          {
            icon: Funnel,
            disabled: isPending,
            onPress() {
              setOpen(true);
            },
          },
        ]}
      />

      {isPending ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{ padding: 20 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: spacing["3xl"],
          }}
          ListEmptyComponent={
            <EmptyState
              title="No trips found"
              description="Try changing the selected filters."
            />
          }
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
      )}

      <TripFiltersModal
        visible={open}
        filters={filters}
        onClose={() => setOpen(false)}
        onApply={setFilters}
      />
    </>
  );
}
