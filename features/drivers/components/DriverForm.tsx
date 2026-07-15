import { UseFormReturn } from "react-hook-form";

import { BaseTextField } from "@/components/form/BaseTextField";
import { FormKeyboardView } from "@/components/form/FormKeyboardView";
import {
  phoneFormatter,
  textFormatter,
} from "@/components/form/helpers/formatter/formatters";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";
import { useVehicles } from "@/modules/vehicles.module";
import { DriverFormData } from "../driver.schema";

type Props = {
  form: UseFormReturn<DriverFormData>;
};

export function DriverForm({ form }: Props) {
  const { data: vehicles = [] } = useVehicles();

  return (
    <FormKeyboardView>
      <BaseTextField
        control={form.control}
        name="name"
        label="Name"
        required
        placeholder="John Doe"
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

      <SelectField
        control={form.control}
        label="Preferred Vehicle"
        name="preferredVehicleId"
        options={vehicles.map((v) => ({ label: v.name, value: v.id }))}
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
