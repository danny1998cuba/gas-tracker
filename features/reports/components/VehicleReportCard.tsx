import { MenuCard } from "@/components/cards/MenuCard";

import { VehicleReport } from "../reports.types";

type Props = {
  report: VehicleReport;

  onPress(): void;
};

export function VehicleReportCard({ report, onPress }: Props) {
  return (
    <MenuCard
      title={report.vehicleName}
      subtitle={`${report.distanceKm.toFixed(1)} km • $${report.totalCost.toFixed(2)}`}
      onPress={onPress}
    />
  );
}
