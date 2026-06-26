import { PropsWithChildren } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { useTheme } from "@/hooks/use-theme";

export function FormKeyboardView({ children }: PropsWithChildren) {
  const { spacing } = useTheme();

  return (
    <KeyboardAwareScrollView
      bottomOffset={24}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,

        padding: spacing.lg,

        paddingBottom: spacing["3xl"],
      }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
