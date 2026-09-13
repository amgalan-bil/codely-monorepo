import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import type { Role } from '../types/index';

export const usersTable = sqliteTable(
  'users_table',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userName: text('user_name').notNull(),
    email: text('email').notNull().unique(),
    avatarUrl: text('avatar_url').default('').notNull(),
    role: text('role').$type<Role>().default('MEMBER').notNull(),
    createdAt: text('created_at')
      .$defaultFn(() => new Date().toISOString())
      .notNull(),
    updatedAt: text('updated_at')
      .$defaultFn(() => new Date().toISOString())
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [uniqueIndex('users_email_idx').on(table.email)],
);
