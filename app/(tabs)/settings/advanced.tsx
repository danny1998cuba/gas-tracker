import { Text } from "@/components/common/ThemedText";
import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

export default function SettingsComingScreen() {
  return (
    <>
      <AppHeader title="Settings" canGoBack />
      <Screen>
        <Text
          style={{ textAlign: "center", paddingVertical: 100, fontSize: 32 }}
        >
          Comming soon...
        </Text>
      </Screen>
    </>
  );
}
