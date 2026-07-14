CREATE TABLE `employee` (
	`employeeId` integer PRIMARY KEY UNIQUE,
	`name` text NOT NULL,
	`employee_title` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` text PRIMARY KEY UNIQUE,
	`employeeId` integer NOT NULL,
	`uom` text NOT NULL,
	`packing` integer NOT NULL,
	`quantity` integer NOT NULL,
	`scan_flag` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `labeling` (
	`id` text PRIMARY KEY UNIQUE,
	`label` text NOT NULL,
	`scan_flag` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `labeling_save_flag_unique` UNIQUE(`label`,`scan_flag`)
);
--> statement-breakpoint
CREATE TABLE `app_settings` (
	`id` text PRIMARY KEY UNIQUE,
	`password` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `employee_settings` (
	`id` text PRIMARY KEY UNIQUE,
	`employeeId` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_employee_settings_employeeId_employee_employeeId_fk` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`employeeId`)
);
