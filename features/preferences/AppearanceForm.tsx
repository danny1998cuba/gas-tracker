import { SelectField } from "@/components/form/SelectField";
import { Section } from "@/components/sections/Section";

import { useThemeMode } from "@/lib/providers/ColorSchemeProvider";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

type FormData = {
  theme: "system" | "light" | "dark";
};

export function AppearanceForm() {
  const { mode, setMode } = useThemeMode();

  const form = useForm<FormData>({
    defaultValues: {
      theme: mode,
    },
  });

  useEffect(() => {
    form.reset({
      theme: mode,
    });
  }, [mode]);

  const theme = useWatch({ control: form.control, name: "theme" });
  useEffect(() => {
    if (theme && theme !== mode) {
      setMode(theme);
    }
  }, [theme, mode, setMode]);

  return (
    <Section title="Appearance" omitMagin>
      <SelectField
        control={form.control}
        name="theme"
        label="Theme"
        options={[
          {
            label: "System",
            value: "system",
          },
          {
            label: "Light",
            value: "light",
          },
          {
            label: "Dark",
            value: "dark",
          },
        ]}
      />
    </Section>
  );
}
