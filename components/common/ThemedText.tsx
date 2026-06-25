import { useTheme } from "@/hooks/use-theme";
import { ColorVariant } from "@/lib/theme/theme";
import { Text as OriginalText, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: ColorVariant;
};

export function Text({ style, type = "text", ...rest }: ThemedTextProps) {
  const { colors } = useTheme();

  return <OriginalText style={[{ color: colors[type] }, style]} {...rest} />;
}
