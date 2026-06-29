import DetailsFieldRow from "@/components/common/DetailsFieldRow";
import { Text } from "@/components/common/ThemedText";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import { useTheme } from "@/hooks/use-theme";
import { usePayment } from "@/modules/payments.module";
import { useDeleteVehicle } from "@/modules/vehicles.module";
import { formatCurrency } from "@/utils/currency.utils";
import { router, useLocalSearchParams } from "expo-router";
import { Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Details() {
  const { colors, radius } = useTheme();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: payment, isPending } = usePayment(id);
  const deleteVehicle = useDeleteVehicle();

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (!payment) {
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
        title={`Payments - ${payment.driver.name}`}
        canGoBack
        rightActions={[
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
          <DetailsFieldRow label="Driver" value={payment.driver.name} />

          <DetailsFieldRow
            label="Amount"
            value={formatCurrency(payment.amount)}
          />

          <DetailsFieldRow
            label="Date"
            value={Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(
              payment.paymentDate,
            )}
          />

          <DetailsFieldRow label="Notes" value={payment.notes ?? "-"} />
        </View>
      </Screen>

      <ConfirmDialog
        visible={showDelete}
        title="Delete Vehicle"
        message={`Are you sure you want to delete this payment?`}
        destructive
        loading={deleteVehicle.isPending}
        confirmLabel="Delete"
        onCancel={() => setShowDelete(false)}
        onConfirm={async () => {
          await deleteVehicle.mutateAsync(payment.id);
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
