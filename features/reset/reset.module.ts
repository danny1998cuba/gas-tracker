import { queryClient } from "@/lib/query/query-client";
import { useMutation } from "@tanstack/react-query";

import { reloadApp } from "@/utils/reload-app";
import { resetApplication } from "./reset.service";

export function useResetApplication() {
  return useMutation({
    mutationFn: resetApplication,

    async onSuccess() {
      await reloadApp();
      await queryClient.invalidateQueries();
    },
  });
}
