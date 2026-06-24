import { useDrivers } from "@/modules/drivers.module";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data: drivers, isPending } = useDrivers();

  if (isPending) return <ActivityIndicator />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>{JSON.stringify(drivers, null, 2)}</Text>
    </SafeAreaView>
  );
}
