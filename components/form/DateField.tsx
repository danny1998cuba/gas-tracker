import { useState } from "react";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Modal, Platform, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { PressField } from "./PressField";

import { showDatePicker } from "./AppDatePicker";
import { useFormField } from "./hooks/useFormField";

type Props<T extends FieldValues> = {
  control: Control<T>;

  name: FieldPath<T>;

  label: string;

  placeholder?: string;
  required?: boolean;
};

export function DateField<T extends FieldValues>({
  control,

  name,

  label,

  placeholder,
  required,
}: Props<T>) {
  const [iosVisible, setIosVisible] = useState(false);

  const {
    field,

    error,
  } = useFormField({
    control,

    name,
  });

  const value = field.value ?? new Date();

  function format(date: Date) {
    return date.toLocaleDateString();
  }

  return (
    <>
      <PressField
        required={required}
        label={label}
        error={error}
        value={field.value ? format(field.value) : undefined}
        placeholder={placeholder}
        onPress={() => {
          if (Platform.OS === "android") {
            showDatePicker({
              value,
              onChange: field.onChange,
            });

            return;
          }

          setIosVisible(true);
        }}
      />

      {Platform.OS === "ios" && (
        <Modal transparent animationType="slide" visible={iosVisible}>
          <View
            style={{
              flex: 1,

              justifyContent: "flex-end",

              backgroundColor: "rgba(0,0,0,.35)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
              }}
            >
              <DateTimePicker
                value={value}
                mode="date"
                display="spinner"
                onChange={(_, date) => {
                  if (date) {
                    field.onChange(date);
                  }
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
