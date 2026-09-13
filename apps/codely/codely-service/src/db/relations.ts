import { relations } from 'drizzle-orm';
import { commentsTable } from './comment.schema';
import { snippetsTable } from './snippet.schema';
import { usersTable } from './user.schema';

/**
 * Relations live in one file so the table modules stay free of import cycles.
 * They are what powers `db.query.<table>.findMany({ with: { … } })`.
 */
export const usersRelations = relations(usersTable, ({ many }) => ({
  snippets: many(snippetsTable),
  comments: many(commentsTable),
}));

export const snippetsRelations = relations(snippetsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [snippetsTable.authorId],
    references: [usersTable.id],
  }),
  comments: many(commentsTable),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  snippet: one(snippetsTable, {
    fields: [commentsTable.snippetId],
    references: [snippetsTable.id],
  }),
  author: one(usersTable, {
    fields: [commentsTable.authorId],
    references: [usersTable.id],
  }),
}));
