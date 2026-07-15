import { useThemeMode } from "@/lib/providers/ColorSchemeProvider";
import { Theme } from "@/lib/theme/theme";

export function useTheme() {
  const { colorScheme } = useThemeMode();
  const colors = Theme.colors[colorScheme];

  return {
    isDark: colorScheme === "dark",
    colorScheme,

    colors,
    spacing: Theme.spacing,
    radius: Theme.radius,
    typography: Theme.typography,
    fonts: Theme.fonts,

    elevation: {
      card: {
        shadowColor: colors.shadow,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        elevation: 3,
      },
    },
  };
}
