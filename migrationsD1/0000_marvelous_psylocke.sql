CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT null,
	`author_id` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`created_by` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_by` text,
	`deleted_at` text,
	`deleted_by` text,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`phoneNumber` text,
	`password` text,
	`name` text,
	`image` text,
	`image_url` text,
	`role` text DEFAULT 'USER' NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`created_by` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_by` text,
	`deleted_at` text,
	`deleted_by` text
);

CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
CREATE UNIQUE INDEX `users_phoneNumber_unique` ON `users` (`phoneNumber`);