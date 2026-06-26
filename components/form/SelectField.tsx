import { Pressable } from "react-native";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import { ChevronDown } from "lucide-react-native";

import { Text } from "@/components/common/ThemedText";
import { useTheme } from "@/hooks/use-theme";

import { FormField } from "./FormField";
import { useFormField } from "./hooks/useFormField";

type Option = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  control: Control<T>;

  name: FieldPath<T>;

  label: string;

  placeholder?: string;

  options: Option[];
};

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select...",
  options,
}: Props<T>) {
  const { colors, radius, spacing } = useTheme();
  const { value, onChange, error } = useFormField({
    control,
    name,
  });

  const selected = options.find((o) => o.value === value);

  return (
    <FormField label={label} error={error}>
      <Pressable
        onPress={() => {
          // Abriremos un Bottom Sheet
        }}
        style={{
          borderWidth: 1,
          borderRadius: radius.md,
          borderColor: error ? colors.danger : colors.border,

          backgroundColor: colors.surface,

          minHeight: 48,

          paddingHorizontal: spacing.md,

          flexDirection: "row",

          alignItems: "center",

          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: selected ? colors.text : colors.textMuted,
          }}
        >
          {selected?.label ?? placeholder}
        </Text>

        <ChevronDown size={18} color={colors.icon} />
      </Pressable>
    </FormField>
  );
}
