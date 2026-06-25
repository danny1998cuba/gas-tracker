import { PropsWithChildren } from "react";

import { View } from "react-native";

export function DashboardGrid({ children }: PropsWithChildren) {
  return (
    <View
      style={{
        flexDirection: "row",

        flexWrap: "wrap",

        gap: 12,
      }}
    >
      {children}
    </View>
  );
}
