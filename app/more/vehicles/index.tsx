import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";

const DriversScreen = () => {
  return (
    <>
      <AppHeader
        title="Drivers"
        canGoBack
        rightActions={[
          {
            icon: Plus,
            onPress() {
              router.push({
                pathname: "/more/vehicles/editor",
                params: { mode: "create" },
              });
            },
          },
        ]}
      />
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

export default DriversScreen;
