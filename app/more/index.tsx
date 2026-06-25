import { MoreCard } from "@/components/cards/MoreCard";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import { router } from "expo-router";
import { Car, Users, Wallet } from "lucide-react-native";

export default function MoreScreen() {
  return (
    <>
      <AppHeader
        title="More options"
        subtitle="Manage small pieces of data from the app"
      />
      <Screen>
        <MoreCard
          title="Drivers"
          subtitle="Manage drivers"
          icon={Users}
          onPress={() => router.push("/more/drivers")}
        />
        <MoreCard
          title="Vehicles"
          subtitle="Manage vehicles"
          icon={Car}
          onPress={() => router.push("/more/vehicles")}
        />
        <MoreCard
          title="Payments"
          subtitle="Manage payments"
          icon={Wallet}
          onPress={() => router.push("/more/payments")}
        />
      </Screen>
    </>
  );
}
