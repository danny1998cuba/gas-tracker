import { EmptyState } from "@/components/common/EmptyState";
import { AppHeader } from "@/components/navigation/AppHeader";
import { PaymentListItem } from "@/features/payments/components/PaymentListItem";
import { useTheme } from "@/hooks/use-theme";
import { usePayments } from "@/modules/payments.module";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";

const PaymentsScreen = () => {
  const { spacing } = useTheme();
  const { data: payments, isPending } = usePayments();

  if (isPending) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <AppHeader
        title="Payments"
        canGoBack
        rightActions={[
          {
            icon: Plus,
            onPress() {
              router.push({
                pathname: "/more/payments/editor",
              });
            },
          },
        ]}
      />

      <FlatList
        style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.xl }}
        data={payments}
        keyExtractor={(item) => item.payment.id}
        ListEmptyComponent={() => (
          <EmptyState
            title="No payments yet"
            description="Register your first payment to see information"
            actions={[
              {
                action() {
                  router.push("/more/payments/editor");
                },
                buttonText: "Create first payment",
                buttonColor: "primary",
                textVariant: "background",
              },
            ]}
          />
        )}
        renderItem={({ item }) => (
          <PaymentListItem
            payment={{ ...item.payment, driverName: item.driverName }}
            onPress={() =>
              router.push({
                pathname: "/more/payments/details",
                params: {
                  id: item.payment.id,
                },
              })
            }
          />
        )}
      />
    </>
  );
};

export default PaymentsScreen;
