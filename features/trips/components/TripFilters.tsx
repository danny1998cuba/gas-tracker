import { View } from "react-native";

import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/common/Button";
import { DateField } from "@/components/form/DateField";
import { SelectField } from "@/components/form/SelectField";

import { useTheme } from "@/hooks/use-theme";

import { useDrivers } from "@/modules/drivers.module";

export type TripFiltersValue = {
  driverId?: string;

  from?: Date;

  to?: Date;
};

type Props = {
  defaultValues?: TripFiltersValue;

  onApply(filters: TripFiltersValue): void;

  onClear?(): void;

  lockedDriverId?: string;
};

export function TripFilters({
  defaultValues,

  onApply,

  onClear,

  lockedDriverId,
}: Props) {
  const { spacing } = useTheme();

  const { data: drivers = [] } = useDrivers();

  const form = useForm<TripFiltersValue>({
    defaultValues: {
      ...defaultValues,
      driverId: lockedDriverId ?? defaultValues?.driverId,
    },
  });

  const driverId = useWatch({
    control: form.control,

    name: "driverId",
  });

  const from = useWatch({
    control: form.control,

    name: "from",
  });

  const to = useWatch({
    control: form.control,

    name: "to",
  });

  function submit() {
    onApply({
      driverId: driverId || undefined,

      from,

      to,
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
