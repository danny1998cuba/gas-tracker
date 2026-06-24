export const queryKeys = {
  drivers: ["drivers"],

  driver: (id: string) => ["drivers", id],

  vehicles: ["vehicles"],

  vehicle: (id: string) => ["vehicles", id],

  trips: ["trips"],

  trip: (id: string) => ["trips", id],

  payments: ["payments"],
  payment: (id: string) => ["payments", id],

  settings: ["settings"],

  reports: ["reports"],
} as const;
