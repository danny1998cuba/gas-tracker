import { Platform } from "react-native";

const tintColorLight = "#1E293B";
const tintColorDark = "#F8FAFC";

export const Colors = {
  light: {
    // Base
    background: "#F7F8F7",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    border: "#E5E7EB",

    // Text
    text: "#1E293B",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",

    // Brand
    primary: "#1E293B",
    tint: tintColorLight,

    // Feedback
    success: "#15803D",
    warning: "#D97706",
    danger: "#DC2626",
    info: "#0284C7",

    // Navigation
    icon: "#64748B",
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorLight,

    // Misc
    shadow: "#00000020",
    overlay: "#00000066",
  },

  dark: {
    // Base
    background: "#0F172A",
    surface: "#1E293B",
    card: "#1E293B",
    border: "#334155",

    // Text
    text: "#F8FAFC",
    textSecondary: "#CBD5E1",
    textMuted: "#94A3B8",

    // Brand
    primary: "#F8FAFC",
    tint: tintColorDark,

    // Feedback
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#38BDF8",

    // Navigation
    icon: "#CBD5E1",
    tabIconDefault: "#64748B",
    tabIconSelected: tintColorDark,

    // Misc
    shadow: "#00000080",
    overlay: "#00000099",
  },
} as const;

export type ColorVariant = keyof (typeof Colors)["light"];

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
  "4xl": 56,
  "5xl": 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const Typography = {
  display: 36,
  title: 32,
  heading: 24,
  section: 20,
  body: 16,
  bodySmall: 15,
  caption: 14,
  overline: 12,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },

  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },

  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  radius: Radius,
  typography: Typography,
  fonts: Fonts,
} as const;
