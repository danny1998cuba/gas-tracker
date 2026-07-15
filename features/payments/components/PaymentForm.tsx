import { UseFormReturn } from "react-hook-form";

import { FormKeyboardView } from "@/components/form/FormKeyboardView";
import { SelectField } from "@/components/form/SelectField";

import { BaseTextField } from "@/components/form/BaseTextField";
import { DateField } from "@/components/form/DateField";
import {
  currencyFormatter,
  textFormatter,
} from "@/components/form/helpers/formatter/formatters";
import { useDrivers } from "@/modules/drivers.module";
import { PaymentFormData } from "../payment.schema";

type Props = {
  form: UseFormReturn<PaymentFormData>;
};

export function PaymentForm({ form }: Props) {
  const { data: drivers = [] } = useDrivers();

  return (
    <FormKeyboardView>
      <SelectField
        required
        control={form.control}
        name="driverId"
        label="Driver"
        placeholder="Select a driver"
        options={drivers.map((driver) => ({
          label: driver.name,
          value: driver.id,
        }))}
      />

      <BaseTextField
        required
        control={form.control}
        name="amount"
        label="Amount"
        formatter={currencyFormatter}
        placeholder="0.00"
      />

      <DateField
        required
        control={form.control}
        name="paymentDate"
        label="Payment Date"
      />

      <BaseTextField
        multiline
        control={form.control}
        name="notes"
        label="Notes"
        formatter={textFormatter}
        placeholder="Optional notes..."
      />
    </FormKeyboardView>
  );
}
