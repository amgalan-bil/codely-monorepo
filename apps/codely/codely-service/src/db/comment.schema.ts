import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { snippetsTable } from './snippet.schema';
import { usersTable } from './user.schema';

export const commentsTable = sqliteTable(
  'comments_table',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => nanoid()),
    body: text('body').notNull(),
    snippetId: text('snippet_id')
      .notNull()
      .references(() => snippetsTable.id, { onDelete: 'cascade' }),
    authorId: text('author_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: text('created_at')
      .$defaultFn(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    index('comments_snippet_idx').on(table.snippetId),
    index('comments_author_idx').on(table.authorId),
  ],
);
