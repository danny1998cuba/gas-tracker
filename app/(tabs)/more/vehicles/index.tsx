import { EmptyState } from "@/components/common/EmptyState";
import { AppHeader } from "@/components/navigation/AppHeader";
import { VehicleListItem } from "@/features/vehicles/components/VehicleListItem";
import { useTheme } from "@/hooks/use-theme";
import { useVehicles } from "@/modules/vehicles.module";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";

const VehiclesScreen = () => {
  const { spacing } = useTheme();
  const { data: vehicles, isPending } = useVehicles();

  if (isPending) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <AppHeader
        title="Vehicles"
        canGoBack
        rightActions={[
          {
            icon: Plus,
            onPress() {
              router.push({
                pathname: "/more/vehicles/editor",
              });
            },
          },
        ]}
      />

      <FlatList
        style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.xl }}
        data={vehicles}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <EmptyState
            title="No vehicles yet"
            description="Register your first vehicle to see information"
            actions={[
              {
                action() {
                  router.push("/more/vehicles/editor");
                },
                buttonText: "Create first vehicle",
                buttonColor: "primary",
                textVariant: "background",
              },
            ]}
          />
        )}
        renderItem={({ item }) => (
          <VehicleListItem
            vehicle={item}
            onPress={() =>
              router.push({
                pathname: "/more/vehicles/details",
                params: {
                  id: item.id,
                },
              })
            }
          />
        )}
      />
    </>
  );
};

export default VehiclesScreen;
