import { reloadAsync } from "expo-updates";
import { DevSettings } from "react-native";

export async function reloadApp() {
  if (__DEV__) {
    DevSettings.reload();
    return;
  }

  await reloadAsync();
}
