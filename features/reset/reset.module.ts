import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/query/query-client";

import { resetApplication } from "./reset.service";

export function useResetApplication() {
  return useMutation({
    mutationFn: resetApplication,

    async onSuccess() {
      await queryClient.invalidateQueries();
    },
  });
}
