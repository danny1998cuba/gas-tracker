import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ActivityIndicator, useColorScheme } from "react-native";

import { getPreferences, persistTheme } from "@/modules/preferences.module";

export type ThemeMode = "system" | "light" | "dark";

type ContextValue = {
  mode: ThemeMode;

  colorScheme: "light" | "dark";

  isDark: boolean;

  setMode(mode: ThemeMode): void;
};

const Context = createContext<ContextValue | null>(null);

export function ColorSchemeProvider({ children }: PropsWithChildren) {
  const system = (useColorScheme() ?? "light") as "light" | "dark";

  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    let mounted = true;

    (async () => {
      const preferences = await getPreferences();

      if (!mounted) return;

      setModeState(preferences?.theme ?? "light");
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    // instantáneo
    setModeState(mode);

    // persistencia en background
    persistTheme(mode).catch(console.error);
  }, []);

  const colorScheme = useMemo(() => {
    switch (mode) {
      case "light":
        return "light";

      case "dark":
        return "dark";

      default:
        return system;
    }
  }, [mode, system]);

  if (mode === null) {
    return <ActivityIndicator />;
  }

  return (
    <Context.Provider
      value={{
        mode,

        colorScheme,

        isDark: colorScheme === "dark",

        setMode,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useThemeMode must be used inside ColorSchemeProvider");
  }

  return context;
}
