import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";

export function AppScrollView({ children }: PropsWithChildren) {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      {children}
    </ScrollView>
  );
}
