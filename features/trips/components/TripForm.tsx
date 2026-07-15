import { useEffect, useMemo } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

import { DateField } from "@/components/form/DateField";
import { FormKeyboardView } from "@/components/form/FormKeyboardView";
import { SelectField } from "@/components/form/SelectField";

import { Section } from "@/components/sections/Section";

import { Text } from "@/components/common/ThemedText";
import { BaseTextField } from "@/components/form/BaseTextField";
import {
  currencyFormatter,
  numberFormatter,
  textFormatter,
} from "@/components/form/helpers/formatter/formatters";
import { useDrivers } from "@/modules/drivers.module";
import { usePreferences } from "@/modules/preferences.module";
import { useVehicles } from "@/modules/vehicles.module";
import { calculateTripSummary } from "@/utils/calculate-trip-cost";
import { TripFormData } from "../trip.schema";
import { TripSummaryCard } from "./TripSummaryCard";

type Props = {
  form: UseFormReturn<TripFormData>;
};

export function TripForm({ form }: Props) {
  const { data: drivers = [] } = useDrivers();
  const { data: vehicles = [] } = useVehicles();

  const { data: preferences } = usePreferences();

  const driverId = useWatch({ control: form.control, name: "driverId" });
  const vehicleId = useWatch({ control: form.control, name: "vehicleId" });
  const distanceKm = useWatch({ control: form.control, name: "distanceKm" });
  const gasPrice = useWatch({
    control: form.control,
    name: "gasPricePerLiter",
  });
  const payerCount = useWatch({ control: form.control, name: "payerCount" });

  useEffect(() => {
    if (!preferences?.preloadPreferredVehicle || vehicleId) {
      return;
    }

    const driver = drivers.find((d) => d.id === driverId);

    if (!driver?.preferredVehicleId) {
      return;
    }

    form.setValue("vehicleId", driver.preferredVehicleId, {
      shouldValidate: true,
    });
  }, [preferences, driverId, vehicleId, drivers, form]);

  const vehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === vehicleId),
    [vehicleId, vehicles],
  );

  const summary = useMemo(() => {
    if (!vehicle) {
      return null;
    }

    return calculateTripSummary(
      distanceKm,
      vehicle.fuelEfficiency,
      gasPrice,
      payerCount,
    );
  }, [vehicle, distanceKm, gasPrice, payerCount]);

  return (
    <FormKeyboardView>
      <Section title="Trip Information" omitMagin>
        <DateField
          control={form.control}
          name="date"
          label="Date"
          required
          mode="datetime"
        />

        <SelectField
          required
          control={form.control}
          name="driverId"
          label="Driver"
          placeholder="Select driver"
          options={drivers.map((driver) => ({
            label: driver.name,

            value: driver.id,
          }))}
        />

        <SelectField
          required
          control={form.control}
          name="vehicleId"
          label="Vehicle"
          placeholder="Select vehicle"
          options={vehicles.map((vehicle) => ({
            label: vehicle.name,

            value: vehicle.id,
          }))}
        />

        <BaseTextField
          required
          control={form.control}
          name="distanceKm"
          label="Distance (km)"
          formatter={numberFormatter}
          placeholder="0"
        />

        <BaseTextField
          required
          control={form.control}
          name="gasPricePerLiter"
          label="Gas Price ($/L)"
          formatter={currencyFormatter}
          placeholder="0.00"
        />

        <BaseTextField
          required
          control={form.control}
          name="payerCount"
          label="Passengers"
          formatter={numberFormatter}
          placeholder="1"
        />

        <BaseTextField
          multiline
          control={form.control}
          name="notes"
          label="Notes"
          formatter={textFormatter}
          placeholder="Optional"
        />
      </Section>

      <Section title="Summary">
        {summary ? (
          <TripSummaryCard summary={summary} />
        ) : (
          <Text type="textSecondary">
            Select a vehicle to display the details
          </Text>
        )}
      </Section>
    </FormKeyboardView>
  );
}
