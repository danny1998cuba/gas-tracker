import { AppHeader } from "@/components/navigation/AppHeader";
import { DriverForm } from "@/features/drivers/components/DriverForm";
import { DriverFormData, driverSchema } from "@/features/drivers/driver.schema";
import { useTheme } from "@/hooks/use-theme";
import {
  useCreateDriver,
  useDriver,
  useUpdateDriver,
} from "@/modules/drivers.module";
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

  const { data: driver, isPending: loadingDriver } = useDriver(id);

  const createDriver = useCreateDriver();
  const updateDriver = useUpdateDriver();

  const form = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      active: driver?.active ?? true,
      name: driver?.name ?? "",
      notes: driver?.notes ?? "",
      phone: driver?.phone ?? "",
    },
  });

  const onSubmit = async (values: DriverFormData) => {
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
      Alert.alert("Error", "Unable to save driver");
    }
  };

  if (loadingDriver) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <AppHeader
        title={isEditing ? "Edit Driver" : "New Driver"}
        canGoBack
        rightActions={[
          {
            icon: Save,
            onPress: form.handleSubmit(onSubmit),
            loading: updateDriver.isPending || createDriver.isPending,
            disabled: loadingDriver,
          },
        ]}
      />

      <ScrollView style={{ padding: spacing.lg }}>
        <DriverForm form={form} />
      </ScrollView>
    </>
  );
};

export default Editor;
