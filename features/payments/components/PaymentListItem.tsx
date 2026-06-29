import { Pressable, StyleSheet, View } from "react-native";

import { ChevronRight, DollarSign } from "lucide-react-native";

import { Text } from "@/components/common/ThemedText";

import { useTheme } from "@/hooks/use-theme";
import { Payment } from "@/modules/payments.module";

type Props = {
  payment: Payment & { driverName: string };
  onPress: () => void;
};

export function PaymentListItem({ payment, onPress }: Props) {
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
        <DollarSign color={colors.success} size={22} />

        <View
          style={{
            flex: 1,

            marginLeft: 12,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            {payment.driverName ?? "-"}
          </Text>

          <Text type="textSecondary">
            {payment.paymentDate.toLocaleDateString()}
          </Text>
        </View>

        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <Text
            type="success"
            style={{
              fontWeight: "700",
            }}
          >
            ${payment.amount.toFixed(2)}
          </Text>

          <ChevronRight color={colors.icon} />
        </View>
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
