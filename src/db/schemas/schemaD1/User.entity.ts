import { sql, InferSelectModel, relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { nanoid } from 'nanoid';
import { PostD1 } from '.';
export const UserD1 = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => nanoid(12)),
	email: text('email').unique().notNull(),
	phoneNumber: text('phoneNumber').unique(),
	password: text('password').notNull(),
	name: text('name'),
	image: text('image'),
	imageUrl: text('image_url'),
	role: text('role').notNull().default('USER'),
	isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	createdBy: text('created_by'),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
	updatedBy: text('updated_by'),
	deletedAt: text('deleted_at'),
	deletedBy: text('deleted_by')
});
export const userRalations = relations(UserD1, ({ many }) => ({
	posts: many(PostD1)
}));

export type UserD1Select = InferSelectModel<typeof UserD1>;
