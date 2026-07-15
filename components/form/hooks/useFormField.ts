import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

type Props<T extends FieldValues, TName extends FieldPath<T>> = {
  control: Control<T>;
  name: TName;
};

export function useFormField<
  T extends FieldValues,
  TName extends FieldPath<T>,
>({ control, name }: Props<T, TName>) {
  const { field, fieldState } = useController<T, TName>({
    control,
    name,
  });

  return {
    field,
    error: fieldState.error?.message,
  };
}
