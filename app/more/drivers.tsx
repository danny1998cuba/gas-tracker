import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import React from "react";

const DriversScreen = () => {
  return (
    <>
      <AppHeader title="Drivers" canGoBack />
      <Screen>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            marginBottom: 24,
          }}
        >
          Drivers
        </Text>
      </Screen>
    </>
  );
};

export default DriversScreen;
