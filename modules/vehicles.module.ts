import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { eq } from "drizzle-orm";

import { db } from "@/db";

import { vehicles } from "@/db/schema";

import { queryKeys } from "@/lib/query/query-keys";

export type Vehicle = typeof vehicles.$inferSelect;

export type CreateVehicle = typeof vehicles.$inferInsert;

export type UpdateVehicle = Partial<CreateVehicle>;

const repository = {
  findAll() {
    return db.select().from(vehicles);
  },

  findById(id: string) {
    return db.query.vehicles.findFirst({
      where: eq(vehicles.id, id),
    });
  },

  create(data: CreateVehicle) {
    return db.insert(vehicles).values(data);
  },

  update(
    id: string,

    data: UpdateVehicle,
  ) {
    return db.update(vehicles).set(data).where(eq(vehicles.id, id));
  },

  delete(id: string) {
    return db.delete(vehicles).where(eq(vehicles.id, id));
  },
};

const service = {
  getAll() {
    return repository.findAll();
  },

  getById(id: string) {
    return repository.findById(id);
  },

  create(data: CreateVehicle) {
    return repository.create(data);
  },

  update(
    id: string,

    data: UpdateVehicle,
  ) {
    return repository.update(id, data);
  },

  delete(id: string) {
    return repository.delete(id);
  },
};

export function useVehicles() {
  return useQuery({
    queryKey: queryKeys.vehicles,

    queryFn: () => service.getAll(),
  });
}

export function useVehicle(id: string) {
  return useQuery({
    enabled: !!id,

    queryKey: queryKeys.vehicle(id),

    queryFn: () => service.getById(id),
  });
}

export function useCreateVehicle() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVehicle) => service.create(data),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.vehicles,
      });
    },
  });
}

export function useUpdateVehicle() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      data,
    }: {
      id: string;

      data: UpdateVehicle;
    }) => service.update(id, data),

    onSuccess(
      _,

      variables,
    ) {
      qc.invalidateQueries({
        queryKey: queryKeys.vehicles,
      });

      qc.invalidateQueries({
        queryKey: queryKeys.vehicle(variables.id),
      });
    },
  });
}

export function useDeleteVehicle() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.delete(id),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.vehicles,
      });
    },
  });
}
