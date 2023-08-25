import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, } from 'drizzle-orm/sqlite-core';
export const UserD1 = sqliteTable('user', {
    id: integer('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    age: text('age').notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`)
});
