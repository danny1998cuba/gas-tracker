import { useEffect, useState } from "react";

import { StyleSheet, TextInput, TextInputProps } from "react-native";

import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";

import { useTheme } from "@/hooks/use-theme";

import { FormField } from "./FormField";

import { Formatter } from "./helpers/formatter/formatter.types";
import { useFormField } from "./hooks/useFormField";

type FieldType = "text" | "phone" | "email" | "number" | "currency";

type Props<T extends FieldValues> = Omit<
  TextInputProps,
  "value" | "onChangeText"
> & {
  control: Control<T>;

  name: FieldPath<T>;

  formatter: Formatter<FieldPathValue<T, FieldPath<T>>>;

  label: string;

  helperText?: string;

  required?: boolean;

  type?: FieldType;

  multiline?: boolean;
};

export function BaseTextField<T extends FieldValues>({
  control,
  name,
  formatter,
  label,
  helperText,
  required,
  type = "text",
  multiline,
  ...props
}: Props<T>) {
  const { colors, spacing, radius } = useTheme();

  const { field, error } = useFormField({ control, name });

  const [displayValue, setDisplayValue] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    switch (formatter.mode) {
      case "always":
        setDisplayValue(formatter.format(field.value));
        break;

      case "blur":
        if (!focused) {
          setDisplayValue(formatter.format(field.value));
        }
        break;

      case "never":
      default:
        setDisplayValue(field.value?.toString() ?? "");
        break;
    }
  }, [field.value, focused, formatter]);

  return (
    <FormField
      label={label}
      required={required}
      helperText={helperText}
      error={error}
    >
      <TextInput
        {...props}
        multiline={multiline}
        inputMode={formatter.inputMode}
        keyboardType={formatter.keyboardType}
        placeholderTextColor={colors.textMuted}
        value={displayValue}
        onChangeText={(text) => {
          setDisplayValue(text);
          field.onChange(formatter.parse(text));
        }}
        onBlur={() => {
          field.onBlur();
          setFocused(false);
          if (formatter.mode === "blur") {
            setDisplayValue(formatter.format(field.value));
          }
        }}
        onFocus={() => setFocused(true)}
        style={[
          styles.input,

          {
            color: colors.text,

            backgroundColor: colors.surface,

            borderRadius: radius.md,

            padding: spacing.md,

            minHeight: multiline ? 120 : 48,

            textAlignVertical: multiline ? "top" : "center",

            borderColor: error
              ? colors.danger
              : focused
                ? colors.primary
                : colors.border,
          },

          props.style,
        ]}
      />
    </FormField>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,

    fontSize: 16,
  },
});
