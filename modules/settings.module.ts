import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { db } from "@/db";

import { settings } from "@/db/schema";

import { queryKeys } from "@/lib/query/query-keys";

export type Settings = typeof settings.$inferSelect;

export type UpdateSettings = Partial<typeof settings.$inferInsert>;

const repository = {
  find() {
    return db.query.settings.findFirst();
  },

  update(data: UpdateSettings) {
    return db.update(settings).set(data);
  },
};

const service = {
  get() {
    return repository.find();
  },

  update(data: UpdateSettings) {
    return repository.update(data);
  },
};

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings,

    queryFn: () => service.get(),
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSettings) => service.update(data),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.settings,
      });
    },
  });
}
