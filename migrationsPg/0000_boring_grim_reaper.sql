CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"sub_title" text,
	"created_at" timestamp DEFAULT now()
);
