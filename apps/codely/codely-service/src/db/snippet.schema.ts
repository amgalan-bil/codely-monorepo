import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { usersTable } from './user.schema';
import type { Visibility } from '../types/index';

export const snippetsTable = sqliteTable(
  'snippets_table',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => nanoid()),
    title: text('title').notNull(),
    description: text('description'),
    language: text('language').notNull(),
    code: text('code').notNull(),
    tags: text('tags', { mode: 'json' })
      .$type<string[]>()
      .default([])
      .notNull(),
    visibility: text('visibility')
      .$type<Visibility>()
      .default('PUBLIC')
      .notNull(),
    authorId: text('author_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    viewCount: int('view_count').default(0).notNull(),
    createdAt: text('created_at')
      .$defaultFn(() => new Date().toISOString())
      .notNull(),
    updatedAt: text('updated_at')
      .$defaultFn(() => new Date().toISOString())
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    index('snippets_author_idx').on(table.authorId),
    index('snippets_visibility_idx').on(table.visibility),
  ],
);
