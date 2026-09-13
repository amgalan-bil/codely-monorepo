CREATE TABLE `users_table` (
	`id` text PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`email` text NOT NULL,
	`avatar_url` text DEFAULT '' NOT NULL,
	`role` text DEFAULT 'MEMBER' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_idx` ON `users_table` (`email`);--> statement-breakpoint
CREATE TABLE `snippets_table` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`language` text NOT NULL,
	`code` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`visibility` text DEFAULT 'PUBLIC' NOT NULL,
	`author_id` text NOT NULL,
	`view_count` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `snippets_author_idx` ON `snippets_table` (`author_id`);--> statement-breakpoint
CREATE INDEX `snippets_visibility_idx` ON `snippets_table` (`visibility`);--> statement-breakpoint
CREATE TABLE `comments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text NOT NULL,
	`snippet_id` text NOT NULL,
	`author_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`snippet_id`) REFERENCES `snippets_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`author_id`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `comments_snippet_idx` ON `comments_table` (`snippet_id`);--> statement-breakpoint
CREATE INDEX `comments_author_idx` ON `comments_table` (`author_id`);