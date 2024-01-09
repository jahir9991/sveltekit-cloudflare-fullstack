import { sql, InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
export const UserD1 = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username').unique(),
	email: text('email').unique().default(null),
	phoneNumber: text('phoneNumber').unique().default(null),
	password: text('password'),
	role: text('role').notNull().default('USER'),
	isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	createdBy: text('created_by'),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
	updatedBy: text('updated_by'),
	deletedAt: text('deleted_at'),
	deletedBy: text('deleted_by')
});

export type UserD1Select = InferSelectModel<typeof UserD1>;
export const insertUserSchema = createInsertSchema(UserD1);
