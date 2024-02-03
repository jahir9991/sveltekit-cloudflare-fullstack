import { sql, InferSelectModel, relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { UserD1 } from '.';
import { nanoid } from 'nanoid';
import { createInsertSchema } from 'drizzle-zod';

export const PostD1 = sqliteTable('posts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => nanoid(12)),
	title: text('title').notNull(),
	description: text('description').default(null),
	authorId: text('author_id')
		.notNull()
		.references(() => UserD1.id),
	isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	createdBy: text('created_by'),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
	updatedBy: text('updated_by'),
	deletedAt: text('deleted_at'),
	deletedBy: text('deleted_by')
});

export const postRelations = relations(PostD1, ({ one }) => ({
	author: one(UserD1, {
		fields: [PostD1.authorId],
		references: [UserD1.id]
	})
}));

export type PostD1Select = InferSelectModel<typeof PostD1>;

export const insertPostSchema = createInsertSchema(PostD1);
