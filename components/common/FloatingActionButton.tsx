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

        bottom: 32,

        right: 24,

        height: 64,

        width: 64,

        borderRadius: 32,

        alignItems: "center",
        backgroundColor: theme.colors.primary,

        justifyContent: "center",
      }}
    >
      <Plus size={28} color={theme.colors.background} />
    </Pressable>
  );
}
