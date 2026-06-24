import { db } from "@/db";
import { drivers } from "@/db/schema";
import { queryKeys } from "@/lib/query/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

export type Driver = typeof drivers.$inferSelect;
export type CreateDriver = typeof drivers.$inferInsert;
export type UpdateDriver = Partial<CreateDriver>;

const repository = {
  findAll() {
    return db.select().from(drivers);
  },

  findById(id: string) {
    return db.query.drivers.findFirst({
      where: eq(drivers.id, id),
    });
  },

  create(data: CreateDriver) {
    return db.insert(drivers).values(data);
  },

  update(
    id: string,

    data: UpdateDriver,
  ) {
    return db.update(drivers).set(data).where(eq(drivers.id, id));
  },

  delete(id: string) {
    return db.delete(drivers).where(eq(drivers.id, id));
  },
};

const service = {
  getAll() {
    return repository.findAll();
  },

  getById(id: string) {
    return repository.findById(id);
  },

  create(data: CreateDriver) {
    return repository.create(data);
  },

  update(
    id: string,

    data: UpdateDriver,
  ) {
    return repository.update(id, data);
  },

  delete(id: string) {
    return repository.delete(id);
  },
};

export function useDrivers() {
  return useQuery({
    queryKey: queryKeys.drivers,
    queryFn: () => service.getAll(),
  });
}

export function useDriver(id: string) {
  return useQuery({
    enabled: !!id,

    queryKey: queryKeys.driver(id),

    queryFn: () => service.getById(id),
  });
}

export function useCreateDriver() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDriver) => service.create(data),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.drivers,
      });
    },
  });
}

export function useUpdateDriver() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      data,
    }: {
      id: string;

      data: UpdateDriver;
    }) => service.update(id, data),

    onSuccess(
      _,

      variables,
    ) {
      qc.invalidateQueries({
        queryKey: queryKeys.drivers,
      });

      qc.invalidateQueries({
        queryKey: queryKeys.driver(variables.id),
      });
    },
  });
}

export function useDeleteDriver() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.delete(id),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.drivers,
      });
    },
  });
}
