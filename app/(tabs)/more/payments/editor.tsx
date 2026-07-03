import { AppHeader } from "@/components/navigation/AppHeader";
import { PaymentForm } from "@/features/payments/components/PaymentForm";
import {
  PaymentFormData,
  paymentSchema,
} from "@/features/payments/payment.schema";
import { useTheme } from "@/hooks/use-theme";
import { useCreatePayment } from "@/modules/payments.module";
import { clearEmptyStrings } from "@/utils/clear-empty-strings";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Save } from "lucide-react-native";
import { nanoid } from "nanoid/non-secure";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, ScrollView } from "react-native";

const Editor = () => {
  const { spacing } = useTheme();

  const createPayment = useCreatePayment();

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
      driverId: undefined,
      notes: "",
      paymentDate: new Date(),
    },
  });

  const onSubmit = async (values: PaymentFormData) => {
    const toSave = clearEmptyStrings(values, "null");

    try {
      const now = new Date();
      await createPayment.mutateAsync({
        ...toSave,
        id: nanoid(),
        createdAt: now,
      });

      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to save payment");
    }
  };

  return (
    <>
      <AppHeader
        title="New Payment"
        canGoBack
        rightActions={[
          {
            icon: Save,
            onPress: form.handleSubmit(onSubmit),
            loading: createPayment.isPending,
          },
        ]}
      />

      <ScrollView style={{ padding: spacing.lg }}>
        <PaymentForm form={form} />
      </ScrollView>
    </>
  );
};

export default Editor;
