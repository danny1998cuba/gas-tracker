import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import React from "react";

const VehiclesScreen = () => {
  return (
    <>
      <AppHeader title="Vehicles" canGoBack />
      <Screen>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            marginBottom: 24,
          }}
        >
          Vehicles
        </Text>
      </Screen>
    </>
  );
};

export default VehiclesScreen;
