ALTER TABLE `blog` ADD `blogName` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `blog_blogName_unique` ON `blog` (`blogName`);