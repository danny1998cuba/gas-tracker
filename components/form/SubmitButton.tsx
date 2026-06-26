import { ActivityIndicator, Pressable } from "react-native";

import { Text } from "@/components/common/ThemedText";

import { useTheme } from "@/hooks/use-theme";

type Props = {
  title: string;

  loading?: boolean;

  disabled?: boolean;

  onPress: () => void;
};

export function SubmitButton({ title, loading, disabled, onPress }: Props) {
  const { colors, radius, spacing } = useTheme();

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={{
        height: 52,
        borderRadius: radius.md,
        justifyContent: "center",
        alignItems: "center",
        marginTop: spacing.xl,
        backgroundColor: disabled ? colors.border : colors.primary,
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          type="background"
          style={{
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
