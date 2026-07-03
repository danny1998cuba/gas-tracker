import { ActivityIndicator } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { nanoid } from "nanoid/non-secure";

import { Save } from "lucide-react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { TripForm } from "@/features/trips/components/TripForm";
import { TripFormData, tripSchema } from "@/features/trips/trip.schema";

import {
    useCreateTrip,
    useLastTrip,
    useTrip,
    useUpdateTrip,
} from "@/modules/trip.module";

export default function TripEditor() {
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const editing = !!id;

  const { data: trip, isPending } = useTrip(id ?? "");
  const { data: lastTrip, isPending: isLoadingLast } = useLastTrip();

  const createTrip = useCreateTrip();
  const updateTrip = useUpdateTrip();

  const form = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      date: trip?.date ?? new Date(),
      driverId: (editing ? trip : lastTrip)?.driverId ?? "",
      vehicleId: (editing ? trip : lastTrip)?.vehicleId ?? "",
      distanceKm: trip?.distanceKm ?? 0,
      gasPricePerLiter: (editing ? trip : lastTrip)?.gasPricePerLiter ?? 0,
      payerCount: (editing ? trip : lastTrip)?.payerCount ?? 1,
      notes: trip?.notes ?? "",
    },
  });

  async function submit(values: TripFormData) {
    if (editing) {
      await updateTrip.mutateAsync({
        id,

        data: {
          ...values,

          updatedAt: new Date(),
        },
      });
    } else {
      const now = new Date();

      await createTrip.mutateAsync({
        id: nanoid(),

        ...values,

        createdAt: now,

        updatedAt: now,
      });
    }

    router.back();
  }

  if (editing && isPending) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <AppHeader
        canGoBack
        title={editing ? "Edit Trip" : "New Trip"}
        rightActions={[
          {
            icon: Save,

            loading: createTrip.isPending || updateTrip.isPending,
            disabled: isPending || isLoadingLast,

            onPress: form.handleSubmit(submit),
          },
        ]}
      />

      <Screen>
        <TripForm form={form} />
      </Screen>
    </>
  );
}
