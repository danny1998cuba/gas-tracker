import { Platform } from "react-native";

import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  value: Date;

  mode?: "date" | "time";

  onChange(date: Date): void;
};

export function showDatePicker({ value, mode = "date", onChange }: Props) {
  if (Platform.OS === "android") {
    DateTimePickerAndroid.open({
      value,
      mode,
      is24Hour: true,

      onChange: (event: DateTimePickerEvent, date) => {
        if (event.type !== "set" || !date) {
          return;
        }

        onChange(date);
      },
    });

    return null;
  }

  return (
    <DateTimePicker
      value={value}
      mode={mode}
      display="spinner"
      onChange={(_, date) => {
        if (!date) return;

        onChange(date);
      }}
    />
  );
}
