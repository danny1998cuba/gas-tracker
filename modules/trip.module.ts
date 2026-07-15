import { and, eq, gte, lte, SQL } from "drizzle-orm";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { db } from "@/db";

import { trips } from "@/db/schema";

import { queryKeys } from "@/lib/query/query-keys";
import { calculateTripSummary } from "@/utils/calculate-trip-cost";

export type Trip = typeof trips.$inferSelect;

export type CreateTrip = typeof trips.$inferInsert;

export type UpdateTrip = Partial<CreateTrip>;

export type TripSummary = {
  litersConsumed: number;
  fuelEfficiency: number;
  totalCost: number;
  amountOwed: number;
  costPerPassenger: number;
  costPerKm: number;
  payerCount: number;
};

export type TripsSummary = {
  trips: number;
  debt: number;
  totalDistanceKm: number;
  totalFuelConsumed: number;
  totalCost: number;
};

export type TripFilters = {
  driverId?: string;
  from?: Date;
  to?: Date;
  limit?: number;
  order?: "asc" | "desc";
};

type TripEntity = Awaited<ReturnType<typeof repository.findById>>;
export type TripWithSummary = NonNullable<TripEntity> & TripSummary;

function enrichTrip(trip: NonNullable<TripEntity>) {
  return {
    ...trip,
    ...calculateTripSummary(
      trip.distanceKm,
      trip.vehicle.fuelEfficiency,
      trip.gasPricePerLiter,
      trip.payerCount,
    ),
  };
}

const repository = {
  findAll(filters?: TripFilters) {
    const conditions: SQL[] = [];

    if (filters?.driverId) {
      conditions.push(eq(trips.driverId, filters.driverId));
    }

    if (filters?.from) {
      conditions.push(gte(trips.date, filters.from));
    }

    if (filters?.to) {
      conditions.push(lte(trips.date, filters.to));
    }

    return db.query.trips.findMany({
      where: conditions.length ? and(...conditions) : undefined,

      orderBy: (trip, operators) => [
        filters?.order === "asc"
          ? operators.asc(trip.date)
          : operators.desc(trip.date),
      ],

      limit: filters?.limit,

      with: {
        driver: true,

        vehicle: true,
      },
    });
  },

  getSummary() {
    return this.findAll();
  },

  findLastTrip() {
    return db.query.trips.findFirst({
      orderBy: (trips, { desc }) => [desc(trips.date)],
      with: {
        driver: true,
        vehicle: true,
      },
    });
  },

  findById(id: string) {
    return db.query.trips.findFirst({
      where: eq(trips.id, id),

      with: {
        driver: true,

        vehicle: true,
      },
    });
  },

  create(data: CreateTrip) {
    return db.insert(trips).values(data);
  },

  update(
    id: string,

    data: UpdateTrip,
  ) {
    return db.update(trips).set(data).where(eq(trips.id, id));
  },

  delete(id: string) {
    return db.delete(trips).where(eq(trips.id, id));
  },
};

const service = {
  async getAll(filters?: TripFilters) {
    const data = await repository.findAll(filters);
    return data.map(enrichTrip);
  },

  async getById(id?: string) {
    if (!id) return null;

    const trip = await repository.findById(id);
    if (!trip) return null;

    return enrichTrip(trip);
  },

  async getLastTrip() {
    const trip = await repository.findLastTrip();
    if (!trip) return null;
    return enrichTrip(trip);
  },

  async getSummary(): Promise<TripsSummary> {
    const data = await repository.getSummary();

    return data.reduce<TripsSummary>(
      (summary, trip) => {
        const calculation = calculateTripSummary(
          trip.distanceKm,
          trip.vehicle.fuelEfficiency,
          trip.gasPricePerLiter,
          trip.payerCount,
        );
        summary.trips++;
        summary.debt += calculation.amountOwed;
        summary.totalDistanceKm += trip.distanceKm;
        summary.totalFuelConsumed += calculation.litersConsumed;
        summary.totalCost += calculation.totalCost;

        return summary;
      },
      {
        trips: 0,
        debt: 0,
        totalDistanceKm: 0,
        totalFuelConsumed: 0,
        totalCost: 0,
      },
    );
  },

  create(data: CreateTrip) {
    return repository.create(data);
  },

  update(id: string, data: UpdateTrip) {
    return repository.update(id, data);
  },

  delete(id: string) {
    return repository.delete(id);
  },
};

export function useTrips(filters?: TripFilters) {
  return useQuery({
    queryKey: [...queryKeys.trips, filters],
    queryFn: () => service.getAll(filters),
  });
}

export function useTrip(id?: string) {
  return useQuery({
    queryKey: queryKeys.trip(id),
    queryFn: () => service.getById(id),
  });
}

export function useLastTrip() {
  return useQuery({
    queryKey: [queryKeys.trips, "last"],
    queryFn: () => service.getLastTrip(),
  });
}

export function useTripsSummary() {
  return useQuery({
    queryKey: [...queryKeys.trips, "summary"],
    queryFn: () => service.getSummary(),
  });
}

export function useCreateTrip() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTrip) => service.create(data),

    onSuccess() {
      qc.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes(queryKeys.trips);
        },
      });

      qc.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes(queryKeys.reports);
        },
      });
    },
  });
}

export function useUpdateTrip() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      data,
    }: {
      id: string;
      data: UpdateTrip;
    }) => service.update(id, data),

    onSuccess(
      _,

      variables,
    ) {
      qc.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes(queryKeys.trips);
        },
      });

      qc.invalidateQueries({
        queryKey: queryKeys.trip(variables.id),
      });

      qc.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes(queryKeys.reports);
        },
      });
    },
  });
}

export function useDeleteTrip() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.delete(id),

    onSuccess() {
      qc.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes(queryKeys.trips);
        },
      });

      qc.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes(queryKeys.reports);
        },
      });
    },
  });
}
