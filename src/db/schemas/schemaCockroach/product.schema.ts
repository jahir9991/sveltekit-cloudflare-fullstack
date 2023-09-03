import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const ProductPg = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),

});