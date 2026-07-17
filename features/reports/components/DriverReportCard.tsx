import { MenuCard } from "@/components/cards/MenuCard";

import { DriverReport } from "../reports.types";

type Props = {
  report: DriverReport;

  onPress(): void;
};

export function DriverReportCard({ report, onPress }: Props) {
  return (
    <MenuCard
      title={report.driverName}
      subtitle={`${report.trips} trips • $${report.amountOwed.toFixed(2)} owed`}
      onPress={onPress}
    />
  );
}
