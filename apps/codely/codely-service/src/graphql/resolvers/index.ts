import { eq } from 'drizzle-orm';
import { commentsTable, snippetsTable, usersTable } from '../../db/index';
import type {
  BaseResolver,
  CommentRow,
  GraphQLContext,
  SnippetRow,
  UserRow,
} from '../../types/index';
import * as Query from './queries/index';
import * as Mutation from './mutations/index';

type NoArgs = Record<string, never>;

const userSnippets: BaseResolver<NoArgs, SnippetRow[], UserRow> = (
  parent,
  _args,
  { db }: GraphQLContext,
) =>
  db.select().from(snippetsTable).where(eq(snippetsTable.authorId, parent.id));

const snippetAuthor: BaseResolver<NoArgs, UserRow | null, SnippetRow> = async (
  parent,
  _args,
  { db }: GraphQLContext,
) => {
  const [author] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, parent.authorId))
    .limit(1);

  return author ?? null;
};

const snippetComments: BaseResolver<NoArgs, CommentRow[], SnippetRow> = (
  parent,
  _args,
  { db }: GraphQLContext,
) =>
  db.select().from(commentsTable).where(eq(commentsTable.snippetId, parent.id));

const commentAuthor: BaseResolver<NoArgs, UserRow | null, CommentRow> = async (
  parent,
  _args,
  { db }: GraphQLContext,
) => {
  const [author] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, parent.authorId))
    .limit(1);

  return author ?? null;
};

export const resolvers = {
  Query: {
    getUsers: Query.getUsers,
    getUserById: Query.getUserById,
    getSnippets: Query.getSnippets,
    getSnippetById: Query.getSnippetById,
    getSnippetsByUserId: Query.getSnippetsByUserId,
  },
  Mutation: {
    createUser: Mutation.createUser,
    createSnippet: Mutation.createSnippet,
    updateSnippet: Mutation.updateSnippet,
    deleteSnippet: Mutation.deleteSnippet,
    createComment: Mutation.createComment,
  },
  User: {
    snippets: userSnippets,
  },
  Snippet: {
    author: snippetAuthor,
    comments: snippetComments,
  },
  Comment: {
    author: commentAuthor,
  },
};
