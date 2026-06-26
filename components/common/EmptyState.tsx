import { useTheme } from "@/hooks/use-theme";
import { ColorVariant } from "@/lib/theme/theme";
import { Pressable, View } from "react-native";
import { Text } from "./ThemedText";

type Props = {
  title: string;
  description: string;
  actions?: {
    action: () => void;
    buttonText: string;
    buttonColor?: ColorVariant;
    textVariant?: ColorVariant;
  }[];
};

export function EmptyState({ title, description, actions }: Props) {
  const { colors, spacing, typography, radius } = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: spacing["3xl"],
      }}
    >
      <Text
        style={{
          fontSize: typography.heading,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>

      <Text
        type="textSecondary"
        style={{
          fontSize: typography.bodySmall,
          textAlign: "center",
          marginTop: 8,
        }}
      >
        {description}
      </Text>

      {actions && actions.length > 0 && (
        <View
          style={{
            flexDirection: "column",
            gap: spacing.md,
            marginTop: spacing["2xl"],
          }}
        >
          {actions.map((action, index) => (
            <Pressable
              key={`empty_action_${index}`}
              onPress={action.action}
              style={{
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                backgroundColor: colors[action.buttonColor ?? "primary"],
                borderRadius: radius.sm,
              }}
            >
              <Text
                type={action.textVariant}
                style={{ fontSize: typography.body }}
              >
                {action.buttonText}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
