CREATE TABLE `drivers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`notes` text,
	`active` integer DEFAULT true NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`driverId` text NOT NULL,
	`amount` real NOT NULL,
	`paymentDate` integer NOT NULL,
	`notes` text,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`driverId`) REFERENCES `drivers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`currency` text DEFAULT 'CAD' NOT NULL,
	`defaultPayerCount` integer DEFAULT 1 NOT NULL,
	`ownerName` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` text PRIMARY KEY NOT NULL,
	`date` integer NOT NULL,
	`driverId` text NOT NULL,
	`vehicleId` text NOT NULL,
	`distanceKm` real NOT NULL,
	`gasPricePerLiter` real NOT NULL,
	`payerCount` integer DEFAULT 1 NOT NULL,
	`notes` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`driverId`) REFERENCES `drivers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`vehicleId`) REFERENCES `vehicles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`brand` text,
	`model` text,
	`year` integer,
	`plate` text,
	`fuelEfficiency` real NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
