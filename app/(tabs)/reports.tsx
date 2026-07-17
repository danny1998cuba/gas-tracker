import { useState } from "react";

import { router } from "expo-router";

import { ScrollView } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppHeader } from "@/components/navigation/AppHeader";

import { Section } from "@/components/sections/Section";

import { Funnel } from "lucide-react-native";

import { EmptyState } from "@/components/common/EmptyState";

import { DriverReportCard } from "@/features/reports/components/DriverReportCard";
import { ReportSummary } from "@/features/reports/components/ReportSummary";
import { VehicleReportCard } from "@/features/reports/components/VehicleReportCard";

import { TripFiltersValue } from "@/features/trips/components/TripFilters";
import { TripFiltersModal } from "@/features/trips/components/TripFiltersModal";
import { useReports } from "@/modules/reports.module";

export default function ReportsScreen() {
  const [filters, setFilters] = useState<TripFiltersValue>({});

  const [open, setOpen] = useState(false);

  const { data } = useReports(filters);

  return (
    <>
      <AppHeader
        title="Reports"
        rightActions={[
          {
            icon: Funnel,

            onPress() {
              setOpen(true);
            },
          },
        ]}
      />

      <Screen>
        {!data ? (
          <EmptyState title="No data" description="Create some trips first." />
        ) : (
          <ScrollView>
            <ReportSummary summary={data.summary} />

            <Section title="By Driver">
              {data.drivers.map((driver) => (
                <DriverReportCard
                  key={driver.driverId}
                  report={driver}
                  onPress={() =>
                    router.push({
                      pathname: "/trips/history",

                      params: {
                        driverId: driver.driverId,
                        from: filters.from?.toISOString(),
                        to: filters.to?.toISOString(),
                        returnTo: "/reports",
                      },
                    })
                  }
                />
              ))}
            </Section>

            <Section title="By Vehicle">
              {data.vehicles.map((vehicle) => (
                <VehicleReportCard
                  key={vehicle.vehicleId}
                  report={vehicle}
                  onPress={() =>
                    router.push({
                      pathname: "/trips/history",

                      params: {
                        vehicleId: vehicle.vehicleId,
                        from: filters.from?.toISOString(),
                        to: filters.to?.toISOString(),
                        returnTo: "/reports",
                      },
                    })
                  }
                />
              ))}
            </Section>
          </ScrollView>
        )}
      </Screen>

      <TripFiltersModal
        visible={open}
        filters={filters}
        onClose={() => setOpen(false)}
        onApply={setFilters}
      />
    </>
  );
}
