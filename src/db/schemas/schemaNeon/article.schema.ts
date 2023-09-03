import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const ArticlePg = pgTable('articles', {
    id: serial('id').primaryKey(),
    title: text('title'),
    subTitle: text('sub_title'),
    body: text('body'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),

});