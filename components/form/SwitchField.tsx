import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Switch } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { FormRow } from "./FormRow";

import { useFormField } from "./hooks/useFormField";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
};

export function SwitchField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: Props<T>) {
  const { colors } = useTheme();

  const { field } = useFormField({
    control,
    name,
  });

  return (
    <FormRow label={label} description={description}>
      <Switch
        value={!!field.value}
        onValueChange={field.onChange}
        trackColor={{
          false: colors.border,
          true: colors.tabIconDefault,
        }}
        thumbColor={colors.tabIconSelected}
      />
    </FormRow>
  );
}
