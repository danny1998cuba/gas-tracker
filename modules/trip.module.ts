import { and, eq, gte, lte } from "drizzle-orm";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { db } from "@/db";

import { trips } from "@/db/schema";

import { queryKeys } from "@/lib/query/query-keys";

export type Trip = typeof trips.$inferSelect;

export type CreateTrip = typeof trips.$inferInsert;

export type UpdateTrip = Partial<CreateTrip>;

export type TripSummary = {
  litersConsumed: number;

  totalCost: number;

  amountOwed: number;
};

function calculateSummary(
  distanceKm: number,

  fuelEfficiency: number,

  gasPricePerLiter: number,

  payerCount: number,
): TripSummary {
  const litersConsumed = (distanceKm * fuelEfficiency) / 100;

  const totalCost = litersConsumed * gasPricePerLiter;

  const amountOwed = totalCost / payerCount;

  return {
    litersConsumed,

    totalCost,

    amountOwed,
  };
}

const repository = {
  findAll() {
    return db.query.trips.findMany({
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

  findByDriver(driverId: string) {
    return db.query.trips.findMany({
      where: eq(trips.driverId, driverId),

      with: {
        driver: true,

        vehicle: true,
      },
    });
  },

  findByDateRange(
    from: Date,

    to: Date,
  ) {
    return db.query.trips.findMany({
      where: and(
        gte(trips.date, from),

        lte(trips.date, to),
      ),

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
  async getAll() {
    const data = await repository.findAll();

    return data.map((trip) => ({
      ...trip,

      ...calculateSummary(
        trip.distanceKm,

        trip.vehicle.fuelEfficiency,

        trip.gasPricePerLiter,

        trip.payerCount,
      ),
    }));
  },

  getById(id: string) {
    return repository.findById(id);
  },

  getByDriver(driverId: string) {
    return repository.findByDriver(driverId);
  },

  getByDateRange(
    from: Date,

    to: Date,
  ) {
    return repository.findByDateRange(from, to);
  },

  create(data: CreateTrip) {
    return repository.create(data);
  },

  update(
    id: string,

    data: UpdateTrip,
  ) {
    return repository.update(id, data);
  },

  delete(id: string) {
    return repository.delete(id);
  },
};

export function useTrips() {
  return useQuery({
    queryKey: queryKeys.trips,

    queryFn: () => service.getAll(),
  });
}

export function useTrip(id: string) {
  return useQuery({
    enabled: !!id,

    queryKey: queryKeys.trip(id),

    queryFn: () => service.getById(id),
  });
}

export function useTripsByDriver(driverId: string) {
  return useQuery({
    enabled: !!driverId,

    queryKey: ["trips", "driver", driverId],

    queryFn: () => service.getByDriver(driverId),
  });
}

export function useTripsByDateRange(
  from: Date,

  to: Date,
) {
  return useQuery({
    queryKey: ["trips", from, to],

    queryFn: () => service.getByDateRange(from, to),
  });
}

export function useCreateTrip() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTrip) => service.create(data),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.trips,
      });

      qc.invalidateQueries({
        queryKey: queryKeys.reports,
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
    }: any) => service.update(id, data),

    onSuccess(
      _,

      variables,
    ) {
      qc.invalidateQueries({
        queryKey: queryKeys.trips,
      });

      qc.invalidateQueries({
        queryKey: queryKeys.trip(variables.id),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.reports,
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
        queryKey: queryKeys.trips,
      });

      qc.invalidateQueries({
        queryKey: queryKeys.reports,
      });
    },
  });
}
