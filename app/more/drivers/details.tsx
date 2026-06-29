import { ActivityIndicator, StyleSheet, View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { Pencil, Trash2 } from "lucide-react-native";

import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import DetailsFieldRow from "@/components/common/DetailsFieldRow";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { formatPhone } from "@/components/form/helpers/formatter/phone-number.helper";
import { useTheme } from "@/hooks/use-theme";
import { useDeleteDriver, useDriver } from "@/modules/drivers.module";
import { useState } from "react";

export default function DriverDetails() {
  const { colors, spacing, radius } = useTheme();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: driver, isPending } = useDriver(id);
  const deleteDriver = useDeleteDriver();

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (!driver) {
    return (
      <>
        <AppHeader title="Driver" canGoBack />

        <Screen>
          <Text>Driver not found.</Text>
        </Screen>
      </>
    );
  }

  return (
    <>
      <AppHeader
        title={`Drivers - ${driver.name}`}
        canGoBack
        rightActions={[
          {
            icon: Pencil,
            onPress() {
              router.push({
                pathname: "/more/drivers/editor",
                params: {
                  id: driver.id,
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
          <DetailsFieldRow label="Name" value={driver.name} />

          <DetailsFieldRow
            label="Phone"
            value={driver.phone ? formatPhone(driver.phone) : "-"}
          />

          <DetailsFieldRow
            label="Status"
            value={driver.active ? "Active" : "Inactive"}
          />

          <DetailsFieldRow label="Notes" value={driver.notes ?? "-"} />
        </View>

        <View
          style={{
            marginTop: spacing.xl,
          }}
        >
          <Text type="textSecondary">
            Trips, payments and balance will appear here in the next iteration.
          </Text>
        </View>
      </Screen>

      <ConfirmDialog
        visible={showDelete}
        title="Delete Driver"
        message={`Are you sure you want to delete "${driver.name}"?`}
        destructive
        loading={deleteDriver.isPending}
        confirmLabel="Delete"
        onCancel={() => setShowDelete(false)}
        onConfirm={async () => {
          await deleteDriver.mutateAsync(driver.id);
          setShowDelete(false);
          router.dismissTo("/more/drivers");
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
