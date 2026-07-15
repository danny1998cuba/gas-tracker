import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";
import {
  PreferencesFormData,
  preferencesSchema,
} from "@/features/preferences/preferences.schema";
import { PreferencesForm } from "@/features/preferences/PreferencesForm";
import {
  usePreferences,
  useUpdatePreferences,
} from "@/modules/preferences.module";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";

export default function PreferencesScreen() {
  const { data, isPending } = usePreferences();
  const update = useUpdatePreferences();

  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      currency: data?.currency ?? "CAD",
      distanceUnit:
        (data?.distanceUnit as
          | PreferencesFormData["distanceUnit"]
          | undefined) ?? "km",
      defaultGasPrice: data?.defaultGasPrice ?? 0,
      defaultPayerCount: data?.defaultPayerCount ?? 1,
      preloadPreferredVehicle: data?.preloadPreferredVehicle ?? true,
      preloadLastTrip: data?.preloadLastTrip ?? true,
      defaultTripDate:
        (data?.defaultTripDate as
          | PreferencesFormData["defaultTripDate"]
          | undefined) ?? "today",
    },
  });

  if (isPending) return <ActivityIndicator />;

  return (
    <>
      <AppHeader
        title="Preferences"
        canGoBack
        rightActions={[
          {
            icon: Save,
            loading: update.isPending,
            disabled: isPending || update.isPending,
            onPress: form.handleSubmit(async (values) => {
              await update.mutateAsync(values, {
                onSuccess: () => {
                  alert("Preferences saved successfully");
                },
              });
            }),
          },
        ]}
      />

      <Screen scrollable>
        <PreferencesForm form={form} />
      </Screen>
    </>
  );
}
