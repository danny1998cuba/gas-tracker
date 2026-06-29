import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

export default function ReportsScreen() {
  return (
    <>
      <AppHeader title="Reports" />
      <Screen>
        <Text
          style={{ textAlign: "center", paddingVertical: 100, fontSize: 32 }}
        >
          Comming soon...
        </Text>
        {/* <Section title="Dashboard" omitMagin>
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

        <Section title="By Date" /> */}
      </Screen>
    </>
  );
}
