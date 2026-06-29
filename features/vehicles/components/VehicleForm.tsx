import { UseFormReturn } from "react-hook-form";

import { FormKeyboardView } from "@/components/form/FormKeyboardView";
import { SwitchField } from "@/components/form/SwitchField";

import { BaseTextField } from "@/components/form/BaseTextField";
import {
  numberFormatter,
  textFormatter,
} from "@/components/form/helpers/formatter/formatters";
import { VehicleFormData } from "../vehicles.schema";

type Props = {
  form: UseFormReturn<VehicleFormData>;
};

export function VehicleForm({ form }: Props) {
  return (
    <FormKeyboardView>
      <BaseTextField
        control={form.control}
        name="name"
        label="Name"
        required
        formatter={textFormatter}
        placeholder="Daily Car"
        returnKeyType="next"
      />

      <BaseTextField
        control={form.control}
        name="brand"
        label="Brand"
        formatter={textFormatter}
        placeholder="Toyota"
        returnKeyType="next"
      />

      <BaseTextField
        control={form.control}
        name="model"
        label="Model"
        formatter={textFormatter}
        placeholder="Corolla"
        returnKeyType="next"
      />

      <BaseTextField
        control={form.control}
        name="year"
        label="Year"
        formatter={numberFormatter}
        placeholder="2020"
      />

      <BaseTextField
        control={form.control}
        name="plate"
        label="Plate"
        formatter={textFormatter}
        placeholder="ABC-123"
      />

      <BaseTextField
        control={form.control}
        name="fuelEfficiency"
        label="Fuel efficiency (L / 100 km)"
        formatter={numberFormatter}
        placeholder="8.2"
        helperText="Average fuel consumption"
        required
      />

      <SwitchField control={form.control} name="active" label="Active" />
    </FormKeyboardView>
  );
}
