import DetailsFieldRow from "@/components/common/DetailsFieldRow";
import { Text } from "@/components/common/ThemedText";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import { useTheme } from "@/hooks/use-theme";
import { useDeleteVehicle, useVehicle } from "@/modules/vehicles.module";
import { router, useLocalSearchParams } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Details() {
  const { colors, radius } = useTheme();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: vehicle, isPending } = useVehicle(id);
  const deleteVehicle = useDeleteVehicle();

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (!vehicle) {
    return (
      <>
        <AppHeader title="Vehicle" canGoBack />

        <Screen>
          <Text>Driver not found.</Text>
        </Screen>
      </>
    );
  }

  return (
    <>
      <AppHeader
        title={`Vehicles - ${vehicle.name}`}
        canGoBack
        rightActions={[
          {
            icon: Pencil,
            onPress() {
              router.push({
                pathname: "/more/vehicles/editor",
                params: {
                  id: vehicle.id,
                },
              });
            },
          },

          {
            icon: Trash2,
            color: colors.danger,
            onPress: () => setShowDelete(true),
          },
        ]}
      />

      <Screen>
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
          <DetailsFieldRow label="Name" value={vehicle.name} />

          <DetailsFieldRow label="Brand" value={vehicle.brand ?? "-"} />

          <DetailsFieldRow label="Model" value={vehicle.model ?? "-"} />

          <DetailsFieldRow label="Plate" value={vehicle.plate ?? "-"} />

          <DetailsFieldRow
            label="Year"
            value={vehicle.year?.toString() ?? "-"}
          />

          <DetailsFieldRow
            label="Fuel Efficiency"
            value={`${vehicle.fuelEfficiency.toFixed(1)} L/100km`}
          />

          <DetailsFieldRow
            label="Status"
            value={vehicle.active ? "Active" : "Inactive"}
          />
        </View>
      </Screen>

      <ConfirmDialog
        visible={showDelete}
        title="Delete Vehicle"
        message={`Are you sure you want to delete "${vehicle.name}"?`}
        destructive
        loading={deleteVehicle.isPending}
        confirmLabel="Delete"
        onCancel={() => setShowDelete(false)}
        onConfirm={async () => {
          await deleteVehicle.mutateAsync(vehicle.id);
          setShowDelete(false);
          router.dismissTo("/more/vehicles");
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
