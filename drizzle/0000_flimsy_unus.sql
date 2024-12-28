CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`role` text,
	`emailVerified` integer,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE TABLE `log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (STRFTIME('%s', 'now')) NOT NULL,
	`source` text(254),
	`description` text(2048),
	`type` text(254),
	`code` integer
);
--> statement-breakpoint
CREATE TABLE `image` (
	`imageId` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`blurhash` text NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	`sizeB` integer NOT NULL,
	`aria` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `blogInteractions` (
	`blogId` integer NOT NULL,
	`id` text NOT NULL,
	`status` integer DEFAULT 0,
	PRIMARY KEY(`blogId`, `id`),
	FOREIGN KEY (`blogId`) REFERENCES `blog`(`blogId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `blog` (
	`blogId` integer PRIMARY KEY NOT NULL,
	`owner` text,
	`created_at` integer DEFAULT (STRFTIME('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (STRFTIME('%s', 'now')) NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`preview_image` integer,
	`published` integer DEFAULT false,
	`mdx` text NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TRIGGER [UPDATE_BLOG]
	AFTER UPDATE ON blog FOR EACH ROW
	WHEN OLD.updated_at = NEW.updated_at OR OLD.updated_at IS NULL
BEGIN
	UPDATE blog SET updated_at=(STRFTIME('%s', 'now')) WHERE id=NEW.id;
END;
--> statement-breakpoint
CREATE TABLE `blog_image` (
	`blogId` integer NOT NULL,
	`imageId` integer NOT NULL,
	PRIMARY KEY(`blogId`, `imageId`),
	FOREIGN KEY (`blogId`) REFERENCES `blog`(`blogId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`imageId`) REFERENCES `blog`(`blogId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `blog_tag` (
	`blogId` integer NOT NULL,
	`tagId` integer NOT NULL,
	PRIMARY KEY(`blogId`, `tagId`),
	FOREIGN KEY (`blogId`) REFERENCES `blog`(`blogId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tagId`) REFERENCES `tag`(`tagId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `commentInteractions` (
	`commentId` integer NOT NULL,
	`id` text NOT NULL,
	`status` integer DEFAULT 0,
	PRIMARY KEY(`commentId`, `id`),
	FOREIGN KEY (`commentId`) REFERENCES `blog`(`blogId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`commentId` integer PRIMARY KEY NOT NULL,
	`id` text NOT NULL,
	`blogId` integer NOT NULL,
	`text` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT (STRFTIME('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (STRFTIME('%s', 'now')) NOT NULL,
	`replyTo` integer,
	FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`blogId`) REFERENCES `blog`(`blogId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`replyTo`) REFERENCES `comment`(`commentId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TRIGGER [UPDATE_COMMENT]
	AFTER UPDATE ON comment FOR EACH ROW
	WHEN OLD.updated_at = NEW.updated_at OR OLD.updated_at IS NULL
BEGIN
	UPDATE comment SET updated_at=(STRFTIME('%s', 'now')) WHERE id=NEW.id;
END;
--> statement-breakpoint
CREATE TABLE `tag` (
	`tagId` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `image_name_unique` ON `image` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tag_title_unique` ON `tag` (`title`);