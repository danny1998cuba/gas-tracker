import { useTheme } from "@/hooks/use-theme";
import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "../common/ThemedText";

type Props = {
  title: string;

  subtitle?: string;

  onPress?: () => void;
};

export function MenuCard({
  title,

  subtitle,

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

          padding: theme.spacing.lg,

          borderWidth: 1,

          borderColor: theme.colors.border,

          borderRadius: theme.radius.lg,

          backgroundColor: theme.colors.card,

          marginBottom: theme.spacing.md,
          ...theme.elevation.card,
        }}
      >
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
              style={{
                marginTop: 4,
                color: theme.colors.textSecondary,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        <ChevronRight color={theme.colors.text} />
      </View>
    </Pressable>
  );
}
