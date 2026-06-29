import { PropsWithChildren } from "react";

import { ScrollView, ScrollViewProps, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

type Props = PropsWithChildren<
  {
    scrollable?: boolean;
  } & ScrollViewProps
>;

export function Screen({ children, scrollable, ...rest }: Props) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {scrollable ? (
        <ScrollView
          {...rest}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 120,
          }}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,

            padding: 20,
          }}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
