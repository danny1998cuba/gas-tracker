import { View } from "react-native";

import { useForm } from "react-hook-form";

import { Button } from "@/components/common/Button";
import { DateField } from "@/components/form/DateField";
import { SelectField } from "@/components/form/SelectField";

import { useTheme } from "@/hooks/use-theme";

import { useDrivers } from "@/modules/drivers.module";
import { useVehicles } from "@/modules/vehicles.module";

export type TripFiltersValue = {
  driverId?: string;
  vehicleId?: string;

  from?: Date;

  to?: Date;
};

type Props = {
  defaultValues?: TripFiltersValue;

  onApply(filters: TripFiltersValue): void;

  onClear?(): void;

  lockedDriverId?: string;
  lockedVehicleId?: string;
};

export function TripFilters({
  defaultValues,

  onApply,

  onClear,

  lockedDriverId,
  lockedVehicleId,
}: Props) {
  const { spacing } = useTheme();

  const { data: drivers = [] } = useDrivers();
  const { data: vehicles = [] } = useVehicles();

  const form = useForm<TripFiltersValue>({
    defaultValues: {
      ...defaultValues,
      driverId: lockedDriverId ?? defaultValues?.driverId,
      vehicleId: lockedVehicleId ?? defaultValues?.vehicleId,
    },
  });

  function submit() {
    const values = form.getValues();
    onApply({
      ...values,
      driverId: lockedDriverId ?? values.driverId,
      vehicleId: lockedVehicleId ?? values.vehicleId,
    });
  }

  return (
    <>
      <SelectField
        control={form.control}
        disabled={!!lockedDriverId}
        name="driverId"
        label="Driver"
        placeholder="All drivers"
        options={drivers.map((driver) => ({
          label: driver.name,

          value: driver.id,
        }))}
      />

      <SelectField
        disabled={!!lockedVehicleId}
        control={form.control}
        name="vehicleId"
        label="Vehicle"
        placeholder="All vehicles"
        options={vehicles.map((vehicle) => ({
          label: vehicle.name,
          value: vehicle.id,
        }))}
      />

      <View
        style={{
          flexDirection: "row",

          gap: spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <DateField
            control={form.control}
            name="from"
            label="From"
            mode="date"
          />
        </View>

        <View style={{ flex: 1 }}>
          <DateField control={form.control} name="to" label="To" mode="date" />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",

          marginTop: spacing.lg,

          gap: spacing.md,
        }}
      >
        <Button
          style={{
            flex: 1,
          }}
          variant="ghost"
          title="Clear"
          onPress={() => {
            form.reset({
              driverId: lockedDriverId ?? "",
              vehicleId: lockedVehicleId ?? "",
              from: undefined,
              to: undefined,
            });

            onClear?.();
          }}
        />

        <Button
          style={{
            flex: 1,
          }}
          title="Apply"
          onPress={form.handleSubmit(submit)}
        />
      </View>
    </>
  );
}
