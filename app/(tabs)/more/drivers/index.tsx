import { EmptyState } from "@/components/common/EmptyState";
import { AppHeader } from "@/components/navigation/AppHeader";
import { DriverListItem } from "@/features/drivers/components/DriverListItem";
import { useTheme } from "@/hooks/use-theme";
import { useDrivers } from "@/modules/drivers.module";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";

const DriversScreen = () => {
  const { spacing } = useTheme();
  const { data: drivers = [], isPending } = useDrivers();

  if (isPending) return <ActivityIndicator />;

  return (
    <>
      <AppHeader
        title="Drivers"
        canGoBack
        rightActions={[
          {
            icon: Plus,
            onPress() {
              router.push("/more/drivers/editor");
            },
          },
        ]}
      />

      <FlatList
        style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.xl }}
        data={drivers}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <EmptyState
            title="No drivers yet"
            description="Register your first driver to see information"
            actions={[
              {
                action() {
                  router.push("/more/drivers/editor");
                },
                buttonText: "Create first driver",
                buttonColor: "primary",
                textVariant: "background",
              },
            ]}
          />
        )}
        renderItem={({ item }) => (
          <DriverListItem
            driver={item}
            onPress={() =>
              router.push({
                pathname: "/more/drivers/details",
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

export default DriversScreen;
