import { Text } from "@/components/common/ThemedText";
import { formatPhone } from "@/components/form/helpers/formatter/phone-number.helper";
import { useTheme } from "@/hooks/use-theme";
import { Driver } from "@/modules/drivers.module";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  driver: Driver;
  onPress: () => void;
};

export function DriverListItem({
  driver,

  onPress,
}: Props) {
  const { colors, radius } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.card,

          {
            backgroundColor: colors.surface,

            borderColor: colors.border,

            borderRadius: radius.lg,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text type="textSecondary">{driver.name}</Text>
          {driver.phone && (
            <Text type="textSecondary">{formatPhone(driver.phone)}</Text>
          )}
        </View>

        <ChevronRight color={colors.icon} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,

    padding: 16,

    marginBottom: 12,

    flexDirection: "row",

    alignItems: "center",
  },
});
