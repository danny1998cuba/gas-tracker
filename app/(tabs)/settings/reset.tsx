import { Alert } from "react-native";

import { router } from "expo-router";

import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { Section } from "@/components/sections/Section";

import { Button } from "@/components/common/Button";
import { Text } from "@/components/common/ThemedText";
import { useResetApplication } from "@/features/reset/reset.module";
import { useTheme } from "@/hooks/use-theme";

export default function ResetScreen() {
  const { spacing } = useTheme();
  const reset = useResetApplication();

  return (
    <>
      <AppHeader canGoBack title="Reset Application" />

      <Screen>
        <Section title="Warning" omitMagin>
          <Text>
            This action permanently deletes all application data and backups.
          </Text>

          <Button
            style={{ marginTop: spacing.lg }}
            loading={reset.isPending}
            title="Delete everything"
            onPress={() =>
              Alert.alert(
                "Delete everything?",
                "This action cannot be undone.",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      await reset.mutateAsync();

                      router.dismissTo("/");
                    },
                  },
                ],
              )
            }
          />
        </Section>
      </Screen>
    </>
  );
}
