import { AppHeader } from "@/components/navigation/AppHeader";
import { VehicleForm } from "@/features/vehicles/components/VehicleForm";
import {
  VehicleFormData,
  vehicleSchema,
} from "@/features/vehicles/vehicles.schema";
import { useTheme } from "@/hooks/use-theme";
import {
  useCreateVehicle,
  useUpdateVehicle,
  useVehicle,
} from "@/modules/vehicles.module";
import { clearEmptyStrings } from "@/utils/clear-empty-strings";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { Save } from "lucide-react-native";
import { nanoid } from "nanoid/non-secure";
import React from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, ScrollView } from "react-native";

const Editor = () => {
  const { spacing } = useTheme();

  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;

  const { data: vehicle, isPending: loadingVehicle } = useVehicle(id);

  const createDriver = useCreateVehicle();
  const updateDriver = useUpdateVehicle();

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: vehicle?.name ?? "",
      brand: vehicle?.brand ?? "",
      model: vehicle?.model ?? "",
      plate: vehicle?.plate ?? "",
      year: vehicle?.year ?? null,
      fuelEfficiency: vehicle?.fuelEfficiency ?? 8,
      active: vehicle?.active ?? true,
    },
  });

  const onSubmit = async (values: VehicleFormData) => {
    const toSave = clearEmptyStrings(values, "null");

    try {
      if (isEditing) {
        await updateDriver.mutateAsync({
          id,
          data: {
            ...toSave,
            updatedAt: new Date(),
          },
        });
      } else {
        const now = new Date();
        await createDriver.mutateAsync({
          id: nanoid(),
          ...toSave,
          createdAt: now,
          updatedAt: now,
        });
      }

      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to save vehicle");
    }
  };

  if (loadingVehicle) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <AppHeader
        title={isEditing ? "Edit Vehicle" : "New Vehicle"}
        canGoBack
        rightActions={[
          {
            icon: Save,
            onPress: form.handleSubmit(onSubmit),
            loading: updateDriver.isPending || createDriver.isPending,
            disabled: loadingVehicle,
          },
        ]}
      />

      <ScrollView style={{ padding: spacing.lg }}>
        <VehicleForm form={form} />
      </ScrollView>
    </>
  );
};

export default Editor;
