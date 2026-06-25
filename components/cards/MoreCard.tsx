import { useTheme } from "@/hooks/use-theme";
import type { LucideIcon } from "lucide-react-native";
import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;

  subtitle?: string;

  icon: LucideIcon;

  onPress?: () => void;
};

export function MoreCard({
  title,

  subtitle,

  icon: Icon,

  onPress,
}: Props) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          backgroundColor: theme.colors.card,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.md,
          ...theme.elevation.card,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: theme.spacing.lg,
          }}
        >
          <Icon size={24} color={theme.colors.primary} />

          <View>
            <Text
              style={{
                fontSize: 18,

                fontWeight: "600",
              }}
            >
              {title}
            </Text>

            {subtitle && (
              <Text
                type="textSecondary"
                style={{
                  marginTop: 4,
                }}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        <ChevronRight color={theme.colors.text} />
      </View>
    </Pressable>
  );
}
