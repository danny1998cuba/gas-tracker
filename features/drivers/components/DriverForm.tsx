import { UseFormReturn } from "react-hook-form";

import { BaseTextField } from "@/components/form/BaseTextField";
import { FormKeyboardView } from "@/components/form/FormKeyboardView";
import {
  phoneFormatter,
  textFormatter,
} from "@/components/form/helpers/formatter/formatters";
import { SwitchField } from "@/components/form/SwitchField";
import { DriverFormData } from "../driver.schema";

type Props = {
  form: UseFormReturn<DriverFormData>;
};

export function DriverForm({ form }: Props) {
  return (
    <FormKeyboardView>
      <BaseTextField
        control={form.control}
        name="name"
        label="Name"
        required
        placeholder="John Doe"
        returnKeyType="next"
        formatter={textFormatter}
        autoComplete="name"
      />

      <BaseTextField
        control={form.control}
        name="phone"
        label="Phone"
        keyboardType="phone-pad"
        placeholder="+1 555..."
        formatter={phoneFormatter}
        autoComplete="tel"
      />

      <BaseTextField
        control={form.control}
        name="notes"
        label="Notes"
        placeholder="Optional notes..."
        formatter={textFormatter}
        multiline
      />

      <SwitchField control={form.control} name="active" label="Active" />
    </FormKeyboardView>
  );
}
