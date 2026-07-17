import { View } from "react-native";

import { StatCard } from "@/components/cards/StatCard";

import { SummaryReport } from "../reports.types";

type Props = {
  summary: SummaryReport;
};

export function ReportSummary({ summary }: Props) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
        }}
      >
        <StatCard
          title="Total Cost"
          value={`$${summary.totalCost.toFixed(2)}`}
        />

        <StatCard
          title="Current Debt"
          value={`$${summary.amountOwed.toFixed(2)}`}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginTop: 12,
        }}
      >
        <StatCard title="Trips" value={`${summary.trips}`} />

        <StatCard
          title="Distance"
          value={`${summary.distanceKm.toFixed(1)} km`}
        />
      </View>
    </>
  );
}
