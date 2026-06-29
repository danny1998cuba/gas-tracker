import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

export default function SettingsScreen() {
  return (
    <>
      <AppHeader title="Settings" />
      <Screen>
        <Text
          style={{ textAlign: "center", paddingVertical: 100, fontSize: 32 }}
        >
          Comming soon...
        </Text>
        {/* <MenuCard
          title="Preferences"
          onPress={() => {
            //
          }}
        />

        <MenuCard
          title="Export Data"
          onPress={() => {
            //
          }}
        />

        <MenuCard
          title="Import Data"
          onPress={() => {
            //
          }}
        />

        <MenuCard
          title="Backup"
          onPress={() => {
            //
          }}
        />

        <MenuCard
          title="About"
          onPress={() => {
            //
          }}
        /> */}
      </Screen>
    </>
  );
}
