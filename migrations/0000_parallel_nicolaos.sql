CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
