import { useState } from "react";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Modal, Platform, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { PressField } from "./PressField";

import { useTheme } from "@/hooks/use-theme";
import { formatDate, formatTime } from "@/utils/date.utils";
import { showDatePicker } from "./AppDatePicker";
import { FormField } from "./FormField";
import { useFormField } from "./hooks/useFormField";

type Props<T extends FieldValues> = {
  control: Control<T>;

  name: FieldPath<T>;

  label: string;

  placeholder?: string;
  required?: boolean;
  mode?: "date" | "time" | "datetime";
};

export function DateField<T extends FieldValues>({
  control,

  name,

  label,

  placeholder,
  required,
  mode = "date",
}: Props<T>) {
  const [iosVisible, setIosVisible] = useState(false);
  const { spacing } = useTheme();

  const {
    field,

    error,
  } = useFormField({
    control,

    name,
  });

  const value = field.value ?? new Date();

  return (
    <>
      {mode === "datetime" ? (
        <FormField
          omitMargin
          label={label}
          required={required}
          error={error}
          containerStyle={{
            flexDirection: "row",
            gap: spacing.md,
          }}
        >
          <View style={{ flex: 1 }}>
            <PressField
              value={formatDate(value)}
              onPress={() =>
                showDatePicker({
                  value,
                  mode: "date",
                  onChange(date) {
                    const next = new Date(value);

                    next.setFullYear(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                    );

                    field.onChange(next);
                  },
                })
              }
            />
          </View>

          <View style={{ width: 120 }}>
            <PressField
              value={formatTime(value)}
              onPress={() =>
                showDatePicker({
                  value,
                  mode: "time",
                  onChange(time) {
                    const next = new Date(value);

                    next.setHours(time.getHours(), time.getMinutes());

                    field.onChange(next);
                  },
                })
              }
            />
          </View>
        </FormField>
      ) : (
        <PressField
          required={required}
          label={label}
          error={error}
          value={
            field.value
              ? mode === "date"
                ? formatDate(field.value)
                : formatTime(field.value)
              : undefined
          }
          placeholder={placeholder}
          onPress={() => {
            if (Platform.OS === "android") {
              showDatePicker({
                value,
                onChange: field.onChange,
                mode: mode,
              });

              return;
            }

            setIosVisible(true);
          }}
        />
      )}

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
                mode={mode}
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
