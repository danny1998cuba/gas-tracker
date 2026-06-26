import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;

  name: FieldPath<T>;
};

export function useFormField<T extends FieldValues>({
  control,
  name,
}: Props<T>) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  return {
    field,
    error: fieldState.error?.message,
  };
}
