import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import React from "react";

const PaymentsScreen = () => {
  return (
    <>
      <AppHeader title="Payments" canGoBack />
      <Screen>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            marginBottom: 24,
          }}
        >
          Payments
        </Text>
      </Screen>
    </>
  );
};

export default PaymentsScreen;
