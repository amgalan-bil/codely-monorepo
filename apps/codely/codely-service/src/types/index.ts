import type { GraphQLResolveInfo } from 'graphql';
import type { Database } from '../drizzle-provider/index';

/**
 * The base tsconfig sets `erasableSyntaxOnly`, so these are const objects plus a
 * union type rather than TS enums.
 */
export const ROLES = ['MEMBER', 'ADMIN'] as const;
export type Role = (typeof ROLES)[number];

export const VISIBILITIES = ['PUBLIC', 'PRIVATE'] as const;
export type Visibility = (typeof VISIBILITIES)[number];

export interface GraphQLContext {
  db: Database;
  env: Env;
}

export type BaseResolver<TArgs, TResult, TParent = unknown> = (
  parent: TParent,
  args: TArgs,
  context: GraphQLContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type MutationResponse = {
  message: string;
};

export type CreateUserArgs = {
  input: {
    userName: string;
    email: string;
    avatarUrl?: string | null;
    role?: Role | null;
  };
};

export type CreateSnippetArgs = {
  input: {
    authorId: string;
    title: string;
    language: string;
    code: string;
    description?: string | null;
    tags?: string[] | null;
    visibility?: Visibility | null;
  };
};

export type UpdateSnippetArgs = {
  snippetId: string;
  authorId: string;
  input: {
    title?: string | null;
    language?: string | null;
    code?: string | null;
    description?: string | null;
    tags?: string[] | null;
    visibility?: Visibility | null;
  };
};

export type DeleteSnippetArgs = {
  snippetId: string;
  authorId: string;
};

export type CreateCommentArgs = {
  input: {
    snippetId: string;
    authorId: string;
    body: string;
  };
};

export type GetUserByIdArgs = {
  userId: string;
};

export type GetSnippetByIdArgs = {
  snippetId: string;
};

export type GetSnippetsArgs = {
  visibility?: Visibility | null;
  limit?: number | null;
};

export type GetSnippetsByUserIdArgs = {
  userId: string;
};

export type UserRow = typeof import('../db/index').usersTable.$inferSelect;
export type SnippetRow =
  typeof import('../db/index').snippetsTable.$inferSelect;
export type CommentRow =
  typeof import('../db/index').commentsTable.$inferSelect;

export type QueryResolvers = {
  getUsers: BaseResolver<Record<string, never>, UserRow[]>;
  getUserById: BaseResolver<GetUserByIdArgs, UserRow | null>;
  getSnippets: BaseResolver<GetSnippetsArgs, SnippetRow[]>;
  getSnippetById: BaseResolver<GetSnippetByIdArgs, SnippetRow | null>;
  getSnippetsByUserId: BaseResolver<GetSnippetsByUserIdArgs, SnippetRow[]>;
};

export type MutationResolvers = {
  createUser: BaseResolver<CreateUserArgs, MutationResponse>;
  createSnippet: BaseResolver<CreateSnippetArgs, MutationResponse>;
  updateSnippet: BaseResolver<UpdateSnippetArgs, MutationResponse>;
  deleteSnippet: BaseResolver<DeleteSnippetArgs, MutationResponse>;
  createComment: BaseResolver<CreateCommentArgs, MutationResponse>;
};
