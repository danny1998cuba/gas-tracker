import { useMutation, useQuery } from "@tanstack/react-query";

import { getDatabaseInfo, optimizeDatabase } from "./database.service";

export function useDatabaseInfo() {
  return useQuery({
    queryKey: ["database"],
    queryFn: getDatabaseInfo,
  });
}

export function useOptimizeDatabase() {
  return useMutation({
    mutationFn: optimizeDatabase,
  });
}
