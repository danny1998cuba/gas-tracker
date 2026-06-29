import { PropsWithChildren } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export function FormKeyboardView({ children }: PropsWithChildren) {
  return (
    <KeyboardAwareScrollView
      bottomOffset={24}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
