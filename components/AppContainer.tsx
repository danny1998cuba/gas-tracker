import { PropsWithChildren } from "react";
import { View } from "react-native";

export function AppContainer({ children }: PropsWithChildren) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      {children}
    </View>
  );
}
