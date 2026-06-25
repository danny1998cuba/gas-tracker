import { StatCard } from "@/components/cards/StatCard";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import { Section } from "@/components/sections/Section";
import { View } from "react-native";

export default function ReportsScreen() {
  return (
    <>
      <AppHeader title="Reports" />
      <Screen>
        <Section title="Dashboard" omitMagin>
          <View
            style={{
              flexDirection: "row",

              gap: 12,
            }}
          >
            <StatCard title="Debt" value="$0" />

            <StatCard title="Distance" value="0 km" />
          </View>
        </Section>

        <Section title="By Driver" />

        <Section title="By Vehicle" />

        <Section title="By Date" />
      </Screen>
    </>
  );
}
