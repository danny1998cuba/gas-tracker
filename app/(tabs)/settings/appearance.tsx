import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppearanceForm } from "@/features/preferences/AppearanceForm";

export default function AppearanceScreen() {
  return (
    <>
      <AppHeader canGoBack title="Appearance" />

      <Screen>
        <AppearanceForm />
      </Screen>
    </>
  );
}
