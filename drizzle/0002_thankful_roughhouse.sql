CREATE TABLE `preferences` (
	`id` integer PRIMARY KEY NOT NULL,
	`currency` text DEFAULT 'CAD' NOT NULL,
	`distanceUnit` text DEFAULT 'km' NOT NULL,
	`defaultGasPrice` integer DEFAULT 0 NOT NULL,
	`defaultPayerCount` integer DEFAULT 1 NOT NULL,
	`preloadPreferredVehicle` integer DEFAULT true NOT NULL,
	`preloadLastTrip` integer DEFAULT true NOT NULL,
	`defaultTripDate` text DEFAULT 'today' NOT NULL
);
