import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { eq } from "drizzle-orm";

import { db } from "@/db";

import { payments } from "@/db/schema";

import { queryKeys } from "@/lib/query/query-keys";

export type Payment = typeof payments.$inferSelect;

export type CreatePayment = typeof payments.$inferInsert;

const repository = {
  findAll() {
    return db.select().from(payments);
  },

  findById(id: string) {
    return db.query.payments.findFirst({
      where: eq(payments.id, id),
    });
  },

  create(data: CreatePayment) {
    return db.insert(payments).values(data);
  },

  delete(id: string) {
    return db.delete(payments).where(eq(payments.id, id));
  },
};

const service = {
  getAll() {
    return repository.findAll();
  },

  getById(id: string) {
    return repository.findById(id);
  },

  create(data: CreatePayment) {
    return repository.create(data);
  },

  delete(id: string) {
    return repository.delete(id);
  },
};

export function usePayments() {
  return useQuery({
    queryKey: queryKeys.payments,

    queryFn: () => service.getAll(),
  });
}

export function usePayment(id: string) {
  return useQuery({
    enabled: !!id,

    queryKey: queryKeys.payment(id),

    queryFn: () => service.getById(id),
  });
}

export function useCreatePayment() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePayment) => service.create(data),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.payments,
      });

      qc.invalidateQueries({
        queryKey: queryKeys.reports,
      });
    },
  });
}

export function useDeletePayment() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.delete(id),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.payments,
      });

      qc.invalidateQueries({
        queryKey: queryKeys.reports,
      });
    },
  });
}
