import { UseFormReturn } from "react-hook-form";

import { Section } from "@/components/sections/Section";

import { BaseTextField } from "@/components/form/BaseTextField";
import { SelectField } from "@/components/form/SelectField";
import { SwitchField } from "@/components/form/SwitchField";

import {
  currencyFormatter,
  numberFormatter
} from "@/components/form/helpers/formatter/formatters";

import { PreferencesFormData } from "./preferences.schema";

export function PreferencesForm({
  form,
}: {
  form: UseFormReturn<PreferencesFormData>;
}) {
  return (
    <>
      <Section title="General" omitMagin>
        <SelectField
          control={form.control}
          name="currency"
          label="Currency"
          options={[
            {
              label: "CAD",
              value: "CAD",
            },
            {
              label: "USD",
              value: "USD",
            },
          ]}
        />

        <SelectField
          control={form.control}
          name="distanceUnit"
          label="Distance unit"
          options={[
            {
              label: "Kilometers",
              value: "km",
            },
            {
              label: "Miles",
              value: "mi",
            },
          ]}
        />
      </Section>

      <Section title="Trips">
        <BaseTextField
          control={form.control}
          name="defaultGasPrice"
          type="number"
          label="Default gas price"
          formatter={currencyFormatter}
        />

        <BaseTextField
          control={form.control}
          name="defaultPayerCount"
          type="number"
          label="Default payer count"
          formatter={numberFormatter}
        />

        <SwitchField
          control={form.control}
          name="preloadPreferredVehicle"
          label="Use preferred vehicle"
        />

        <SwitchField
          control={form.control}
          name="preloadLastTrip"
          label="Load last trip values"
        />

        <SelectField
          control={form.control}
          name="defaultTripDate"
          label="Default trip date"
          options={[
            {
              label: "Today",
              value: "today",
            },
            {
              label: "Last used",
              value: "last",
            },
          ]}
        />
      </Section>
    </>
  );
}
