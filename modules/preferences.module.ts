import { eq } from "drizzle-orm";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { db } from "@/db";
import { preferences } from "@/db/schema";

import { queryKeys } from "@/lib/query/query-keys";

export type Preferences = typeof preferences.$inferSelect;

export type UpdatePreferences = Omit<typeof preferences.$inferInsert, "id">;

const repository = {
  get() {
    return db.query.preferences.findFirst();
  },

  async createDefault() {
    await db.insert(preferences).values({
      id: 1,
    });

    return this.get();
  },

  async getOrCreate() {
    const prefs = await this.get();

    if (prefs) {
      return prefs;
    }

    return this.createDefault();
  },

  update(data: UpdatePreferences) {
    return db.update(preferences).set(data).where(eq(preferences.id, 1));
  },
};

const service = {
  get() {
    return repository.getOrCreate();
  },

  update(data: UpdatePreferences) {
    return repository.update(data);
  },
};

export function usePreferences() {
  return useQuery({
    queryKey: queryKeys.preferences,

    queryFn: () => service.get(),
  });
}

export function useUpdatePreferences() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePreferences) => service.update(data),

    onSuccess() {
      qc.invalidateQueries({
        queryKey: queryKeys.preferences,
      });
    },
  });
}

export async function getPreferences() {
  return repository.getOrCreate();
}
