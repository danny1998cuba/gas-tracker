import { StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronLeft } from "lucide-react-native";

import { useRouter } from "expo-router";

import type { LucideIcon } from "lucide-react-native";

import { useTheme } from "@/hooks/use-theme";

import { HeaderButton } from "./HeaderButton";
import { HeaderSpacer } from "./HeaderSpacer";
import { HeaderTitle } from "./HeaderTitle";

export type HeaderAction = {
  icon: LucideIcon;

  onPress?: () => void;

  color?: string;
};

type Props = {
  title: string;

  subtitle?: string;

  canGoBack?: boolean;

  leftAction?: HeaderAction;

  rightActions?: HeaderAction[];
};

export function AppHeader({
  title,
  subtitle,

  canGoBack = false,

  leftAction,

  rightActions = [],
}: Props) {
  const { colors } = useTheme();

  const router = useRouter();

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: colors.surface,
      }}
    >
      <View
        style={[
          styles.container,
          {
            borderBottomColor: colors.border,
            backgroundColor: colors.surface,
          },
        ]}
      >
        <View style={styles.side}>
          {canGoBack ? (
            <HeaderButton icon={ChevronLeft} onPress={() => router.back()} />
          ) : leftAction ? (
            <HeaderButton {...leftAction} />
          ) : (
            <HeaderSpacer />
          )}
        </View>

        <HeaderTitle title={title} subtitle={subtitle} />

        <View style={styles.side}>
          {rightActions.length > 0 ? (
            rightActions.map((action, index) => (
              <HeaderButton key={index} {...action} />
            ))
          ) : (
            <HeaderSpacer />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,

    flexDirection: "row",

    alignItems: "center",

    borderBottomWidth: StyleSheet.hairlineWidth,

    paddingHorizontal: 16,
  },

  side: {
    width: 48,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
});
