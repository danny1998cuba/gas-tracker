import { Control, FieldPath, FieldValues } from "react-hook-form";

import { PressField } from "./PressField";

import { useState } from "react";
import { AppPicker, PickerOption } from "./AppPicker";
import { useFormField } from "./hooks/useFormField";

type Props<T extends FieldValues> = {
  control: Control<T>;

  name: FieldPath<T>;

  label: string;

  disabled?: boolean;

  placeholder?: string;
  required?: boolean;

  options: PickerOption[];
};

export function SelectField<T extends FieldValues>({
  control,

  name,

  label,

  required,
  placeholder,

  options,
  disabled,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const { field, error } = useFormField({
    control,
    name,
  });

  const selected = options.find((o) => o.value === field.value);

  return (
    <>
      <PressField
        disabled={disabled}
        required={required}
        label={label}
        error={error}
        value={selected?.label}
        placeholder={placeholder}
        onPress={() => setOpen(true)}
      />
      <AppPicker
        visible={open}
        title={label}
        value={field.value}
        options={options}
        onClose={() => setOpen(false)}
        onSelect={field.onChange}
      />
    </>
  );
}
