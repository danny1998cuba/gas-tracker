import { useTheme } from "@/hooks/use-theme";
import { Plus } from "lucide-react-native";
import { Pressable } from "react-native";

type Props = {
  onPress: () => void;
};

export function FloatingActionButton({ onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        elevation: 5,

        bottom: theme.spacing.lg,

        right: theme.spacing.xl,

        height: theme.spacing["4xl"],

        width: theme.spacing["4xl"],

        borderRadius: theme.radius.full,

        alignItems: "center",
        backgroundColor: theme.colors.primary,

        justifyContent: "center",
      }}
    >
      <Plus size={28} color={theme.colors.background} />
    </Pressable>
  );
}
